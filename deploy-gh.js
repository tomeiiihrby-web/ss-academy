/* One-off GitHub Pages deployment — reads the credential git already stored. */
const { execFileSync, spawnSync } = require("child_process");

function gitCredential() {
  const r = spawnSync("git", ["credential", "fill"], {
    input: "protocol=https\nhost=github.com\n\n",
    encoding: "utf8",
  });
  const out = r.stdout || "";
  const user = (out.match(/^username=(.*)$/m) || [])[1];
  const pass = (out.match(/^password=(.*)$/m) || [])[1];
  if (!user || !pass) throw new Error("no credential stored: " + (r.stderr || "").slice(0, 200));
  return { user, pass };
}

function sh(cmd, args, opts) {
  const r = spawnSync(cmd, args, Object.assign({ encoding: "utf8" }, opts));
  if (r.status !== 0) throw new Error(cmd + " " + args.join(" ") + " failed: " + (r.stderr || r.stdout || "").slice(0, 400));
  return (r.stdout || "").trim();
}

async function api(token, method, path, body) {
  const res = await fetch("https://api.github.com" + path, {
    method,
    headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "User-Agent": "ss-academy-deploy", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (e) {}
  return { status: res.status, json, text };
}

(async () => {
  const { user, pass } = gitCredential();
  console.log("credential user:", user);

  const me = await api(pass, "GET", "/user");
  if (me.status !== 200) { console.log("GET /user failed", me.status, (me.text || "").slice(0, 300)); process.exit(1); }
  const login = me.json.login;
  console.log("logged in as:", login);

  const REPO = "ss-academy";
  const created = await api(pass, "POST", "/user/repos", {
    name: REPO,
    description: "SS Academy — Minecraft screenshare training site",
    private: false,
    auto_init: false,
  });
  console.log("repo create:", created.status, created.status === 201 ? "created" : ((created.json && created.json.errors && JSON.stringify(created.json.errors)) || (created.json && created.json.message) || "").slice(0, 200));

  const dir = process.cwd();
  if (!require("fs").existsSync(dir + "/.git")) {
    sh("git", ["init", "-b", "main"], { cwd: dir });
  }
  sh("git", ["add", "-A"], { cwd: dir });
  sh("git", ["-c", "user.name=" + login, "-c", "user.email=" + login + "@users.noreply.github.com", "commit", "-m", "SS Academy — training site for Minecraft screenshare staff"], { cwd: dir });
  try { sh("git", ["remote", "remove", "origin"], { cwd: dir }); } catch (e) {}
  sh("git", ["remote", "add", "origin", "https://github.com/" + login + "/" + REPO + ".git"], { cwd: dir });
  const push = spawnSync("git", ["push", "-u", "origin", "main"], { cwd: dir, encoding: "utf8", env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: "0" }) });
  console.log("push:", push.status === 0 ? "ok" : "FAILED " + (push.stderr || push.stdout || "").slice(0, 400));
  if (push.status !== 0) process.exit(1);

  const pages = await api(pass, "POST", "/repos/" + login + "/" + REPO + "/pages", { source: { branch: "main", path: "/" } });
  console.log("pages enable:", pages.status, (pages.json && pages.json.message) || "ok", (pages.json && pages.json.html_url) || "");

  const url = "https://" + login + ".github.io/" + REPO + "/";
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(url, { method: "GET", redirect: "follow" });
      const body = await res.text();
      if (res.status === 200 && body.includes("SS ACADEMY")) {
        console.log("LIVE:", url, "status", res.status);
        console.log("REPO: https://github.com/" + login + "/" + REPO);
        process.exit(0);
      }
      console.log("poll", i, "status", res.status, body.slice(0, 60).replace(/\n/g, " "));
    } catch (e) { console.log("poll", i, String(e).slice(0, 80)); }
    await new Promise(function (r) { setTimeout(r, 6000); });
  }
  console.log("BUILDING:", url, "(repo ready; Pages is building — check back in a minute)");
  console.log("REPO: https://github.com/" + login + "/" + REPO);
})();
