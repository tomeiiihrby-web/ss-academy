/* Generator for assets/machines.js — the simulated machine wall.
 * Run: node tools/gen-machines.js
 * Produces, per case: a dense Task Manager table (90+ rows) and mod folders
 * (Begger 20-30 / mid 50-70 / max 100-140) where the cheat jars sit among
 * ordinary names with nothing marking them out.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const BT = String.fromCharCode(96); // backtick, so detail blocks stay template literals

/* ---------- deterministic PRNG so regenerating never churns the file ---------- */
function rng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ---------- process pool: ordinary Windows 11 + gaming PC software ---------- */
/* [name, publisher, baseMemKB, cpuBase, user, modules] */
const POOL = [
  ["System", "Microsoft", 132, 0.1, "SYSTEM", ["ntoskrnl.exe", "HAL.dll", "ci.dll"]],
  ["Registry", "Microsoft", 4, 0.0, "SYSTEM", ["ntoskrnl.exe", "KERNELBASE.dll"]],
  ["Memory Compression", "Microsoft", 148, 0.3, "SYSTEM", ["ntoskrnl.exe", "store.dll"]],
  ["smss.exe", "Microsoft", 2, 0.0, "SYSTEM", ["ntdll.dll", "KERNEL32.DLL"]],
  ["csrss.exe", "Microsoft", 14, 0.0, "SYSTEM", ["ntdll.dll", "USER32.dll", "KERNELBASE.dll"]],
  ["wininit.exe", "Microsoft", 8, 0.0, "SYSTEM", ["ntdll.dll", "USERENV.dll", "wininit.dll"]],
  ["winlogon.exe", "Microsoft", 9, 0.0, "SYSTEM", ["ntdll.dll", "crypt32.dll", "winlogon.exe"]],
  ["services.exe", "Microsoft", 18, 0.1, "SYSTEM", ["ntdll.dll", "sechost.dll", "ADVAPI32.dll"]],
  ["lsass.exe", "Microsoft", 12, 0.0, "SYSTEM", ["ntdll.dll", "secur32.dll", "lsasrv.dll"]],
  ["fontdrvhost.exe", "Microsoft", 6, 0.0, "SYSTEM", ["ntdll.dll", "gdi32.dll"]],
  ["dwm.exe", "Microsoft", 128, 1.8, "SYSTEM", ["ntdll.dll", "dwmcore.dll", "d3d11.dll"]],
  ["ctfmon.exe", "Microsoft", 22, 0.1, "Steven", ["ntdll.dll", "msctf.dll"]],
  ["SecurityHealthSystray.exe", "Microsoft", 12, 0.0, "Steven", ["ntdll.dll", "SecurityHealthSystray.dll"]],
  ["SecurityHealthService.exe", "Microsoft", 6, 0.0, "SYSTEM", ["ntdll.dll", "SecurityHealthService.dll"]],
  ["MsMpEng.exe", "Microsoft", 152000, 2.4, "SYSTEM", ["ntdll.dll", "BCrypt.dll", "IEFRAME.dll"]],
  ["NisSrv.exe", "Microsoft", 7400, 0.2, "SYSTEM", ["ntdll.dll", "NisSrv.dll"]],
  ["SmartScreen.exe", "Microsoft", 4096, 0.0, "Steven", ["ntdll.dll", "smartscreen.dll"]],
  ["SearchHost.exe", "Microsoft", 28672, 0.1, "Steven", ["ntdll.dll", "SearchHost.dll", "UI.Xaml.dll"]],
  ["SearchApp.exe", "Microsoft", 41000, 0.2, "Steven", ["ntdll.dll", "SearchUI.dll"]],
  ["StartMenuExperienceHost.exe", "Microsoft", 24576, 0.1, "Steven", ["ntdll.dll", "StartMenuExperienceHost.dll"]],
  ["ShellExperienceHost.exe", "Microsoft", 37888, 0.3, "Steven", ["ntdll.dll", "ShellExperienceHost.dll"]],
  ["TextInputHost.exe", "Microsoft", 19456, 0.0, "Steven", ["ntdll.dll", "TextInputHost.dll"]],
  ["sihost.exe", "Microsoft", 9216, 0.0, "Steven", ["ntdll.dll", "sihost.dll"]],
  ["LockApp.exe", "Microsoft", 14336, 0.0, "Steven", ["ntdll.dll", "LockApp.dll"]],
  ["SystemSettings.exe", "Microsoft", 52224, 0.1, "Steven", ["ntdll.dll", "SystemSettings.dll"]],
  ["Widgets.exe", "Microsoft", 33792, 0.4, "Steven", ["ntdll.dll", "Widgets.dll"]],
  ["PhoneExperienceHost.exe", "Microsoft", 16384, 0.0, "Steven", ["ntdll.dll", "PhoneExperienceHost.dll"]],
  ["CrossDeviceResume.exe", "Microsoft", 11264, 0.0, "Steven", ["ntdll.dll", "CrossDeviceResume.dll"]],
  ["AnyDesk.exe", "AnyDesk Software GmbH", 88200, 0.9, "Steven", ["ntdll.dll", "adrt.dll", "AnyDesk.exe"]],
  ["AnyDeskMSI.exe", "AnyDesk Software GmbH", 4096, 0.0, "Steven", ["ntdll.dll", "adrt.dll"]],
  ["nvcontainer.exe", "NVIDIA Corporation", 18432, 0.2, "SYSTEM", ["ntdll.dll", "nvcontainer.dll"]],
  ["NVIDIA App.exe", "NVIDIA Corporation", 102400, 1.1, "Steven", ["ntdll.dll", "NVIDIA Overlay.dll", "nvspcap64.dll"]],
  ["NVIDIA Overlay.exe", "NVIDIA Corporation", 65536, 0.6, "Steven", ["ntdll.dll", "NVIDIA Overlay.dll", "nvspcap64.dll"]],
  ["audiodg.exe", "Microsoft", 12288, 0.2, "SYSTEM", ["ntdll.dll", "audiodg.dll"]],
  ["RTSS.exe", "RivaTuner Statistics Server", 26624, 0.3, "Steven", ["ntdll.dll", "RTSSHooksLoader64.dll"]],
  ["RTSSHooksLoader64.dll", "RivaTuner Statistics Server", 2048, 0.0, "Steven", ["RTSSHooksLoader64.dll"]],
  ["iCUE.exe", "Corsair", 142336, 0.7, "Steven", ["ntdll.dll", "iCUE.dll"]],
  ["iCUE4Engine.exe", "Corsair", 58982, 0.4, "Steven", ["ntdll.dll", "iCUE4.dll"]],
  ["GameBarPresenceWriter.exe", "Microsoft", 8192, 0.0, "Steven", ["ntdll.dll", "GameBarPresenceWriter.dll"]],
  ["GameOverlayUI.exe", "Microsoft", 28672, 0.5, "Steven", ["ntdll.dll", "GameBarPresenceWriter.dll"]],
  ["obs64.exe", "OBS Project", 68128, 0.8, "Steven", ["ntdll.dll", "obs64.exe", "d3d11.dll"]],
  ["obs64.exe", "OBS Project", 0, 0.0, "Steven", []],           /* placeholder, deduped later */
  ["steam.exe", "Valve Corporation", 65536, 0.4, "Steven", ["ntdll.dll", "steam.dll"]],
  ["steamwebhelper.exe", "Valve Corporation", 96256, 0.6, "Steven", ["ntdll.dll", "steamwebhelper.dll"]],
  ["steamerrorreporter.exe", "Valve Corporation", 4096, 0.0, "Steven", ["ntdll.dll", "steamerrorreporter.dll"]],
  ["Code.exe", "Microsoft Corporation", 412000, 2.1, "Steven", ["ntdll.dll", "Code.dll", "ffmpeg.dll"]],
  ["Code Helper (Plugin).exe", "Microsoft Corporation", 221184, 0.5, "Steven", ["ntdll.dll", "Code.dll"]],
  ["Code Helper (Renderer).exe", "Microsoft Corporation", 187392, 1.4, "Steven", ["ntdll.dll", "Code.dll"]],
  ["Code Helper (GPU).exe", "Microsoft Corporation", 152576, 0.9, "Steven", ["ntdll.dll", "Code.dll"]],
  ["node.exe", "Node.js Foundation", 94208, 0.3, "Steven", ["ntdll.dll", "node.dll", "V8.dll"]],
  ["git.exe", "Git SCM Project", 6144, 0.0, "Steven", ["ntdll.dll", "git.exe"]],
  ["bash.exe", "Git SCM Project", 12288, 0.0, "Steven", ["ntdll.dll", "msys-2.0.dll"]],
  ["pwsh.exe", "Microsoft Corporation", 143360, 0.4, "Steven", ["ntdll.dll", "System.Management.Automation.dll"]],
  ["cmd.exe", "Microsoft Corporation", 5120, 0.0, "Steven", ["ntdll.dll", "cmd.exe"]],
  ["conhost.exe", "Microsoft Corporation", 7168, 0.0, "Steven", ["ntdll.dll", "conhost.exe"]],
  ["OpenConsole.exe", "Microsoft Corporation", 9216, 0.0, "Steven", ["ntdll.dll", "OpenConsole.exe"]],
  ["java.exe", "Oracle Corporation", 786432, 1.2, "Steven", ["ntdll.dll", "jvm.dll", "jli.dll"]],
  ["javaw.exe", "Oracle Corporation", 0, 0.0, "Steven", []],     /* placeholder */
  ["PhoneAppHost.exe", "Microsoft Corporation", 30720, 0.1, "Steven", ["ntdll.dll", "PhoneAppHost.dll"]],
  ["CrossDeviceSession.exe", "Microsoft Corporation", 14336, 0.0, "Steven", ["ntdll.dll", "CrossDeviceSession.dll"]],
  ["WSAUpdater.exe", "Microsoft Corporation", 8192, 0.0, "Steven", ["ntdll.dll", "WSAUpdater.dll"]],
  ["PrintIsolationHost.exe", "Microsoft Corporation", 4096, 0.0, "Steven", ["ntdll.dll", "printisolationhost.dll"]],
  ["spoolsv.exe", "Microsoft Corporation", 16384, 0.0, "SYSTEM", ["ntdll.dll", "spoolss.dll"]],
  ["SearchProtocolHost.exe", "Microsoft Corporation", 11264, 0.0, "Steven", ["ntdll.dll", "SearchProtocolHost.dll"]],
  ["dllhost.exe", "Microsoft Corporation", 12288, 0.0, "Steven", ["ntdll.dll", "CLSNT32.DLL"]],
  ["taskhostw.exe", "Microsoft Corporation", 20480, 0.0, "Steven", ["ntdll.dll", "taskhostw.dll"]],
  ["taskhost.exe", "Microsoft Corporation", 14336, 0.0, "Steven", ["ntdll.dll", "taskhost.dll"]],
  ["backgroundTaskHost.exe", "Microsoft Corporation", 10240, 0.0, "Steven", ["ntdll.dll", "backgroundTaskHost.dll"]],
  ["RuntimeBroker.exe", "Microsoft Corporation", 18432, 0.1, "Steven", ["ntdll.dll", "RuntimeBroker.dll"]],
  ["ApplicationFrameHost.exe", "Microsoft Corporation", 30720, 0.2, "Steven", ["ntdll.dll", "ApplicationFrameHost.dll"]],
  ["SystemSettings.exe", "Microsoft Corporation", 52224, 0.1, "Steven", ["ntdll.dll", "SystemSettings.dll"]],
  ["PickerHost.exe", "Microsoft Corporation", 11264, 0.0, "Steven", ["ntdll.dll", "PickerHost.dll"]],
  ["ShellHost.exe", "Microsoft Corporation", 7168, 0.0, "Steven", ["ntdll.dll", "ShellHost.dll"]],
  ["smss.exe", "Microsoft", 0, 0.0, "SYSTEM", []],                /* placeholder, deduped */
  ["fontdrvhost.exe", "Microsoft", 0, 0.0, "SYSTEM", []],        /* placeholder, deduped */
  ["ShellExperienceHost", "Microsoft Corporation", 0, 0.0, "Steven", []], /* placeholder */
  ["nvspcap64.dll", "NVIDIA Corporation", 6144, 0.0, "Steven", ["nvspcap64.dll"]],
  ["GameInput.dll", "Microsoft Corporation", 3072, 0.0, "Steven", ["GameInput.dll"]],
  ["ElgatoSDKPlugin", "elgato", 4096, 0.0, "Steven", ["ElgatoSDKPlugin.dll"]]
];

/* Rows that repeat N times with a counter, to reach a realistic total. */
const CHROME = ["chrome.exe", "Google LLC", 142336, 1.3, "Steven",
  ["ntdll.dll", "chrome.dll", "d3d11.dll", "dxgi.dll", "winhttp.dll"]];
const DISCORD = ["Discord.exe", "Discord Inc.", 148224, 2.1, "Steven",
  ["ntdll.dll", "discord.dll", "dwrite.dll", "winmm.dll"]];
const EDGEWEB = ["msedgewebview2.exe", "Microsoft Corporation", 98304, 0.7, "Steven",
  ["ntdll.dll", "msedgewebview2.exe", "d3d11.dll"]];
const SVCHOST = ["svchost.exe", "Microsoft", 48128, 0.3, "SYSTEM",
  ["ntdll.dll", "sechost.dll", "ADVAPI32.dll", "WS2_32.dll"]];
const WMIPRVSE = ["WmiPrvSE.exe", "Microsoft", 10240, 0.1, "SYSTEM",
  ["ntdll.dll", "fastprox.dll", "winhttp.dll"]];
const CONHOST = ["conhost.exe", "Microsoft", 7168, 0.0, "Steven", ["ntdll.dll", "conhost.exe"]];

/* ---------- mod folder tiers ---------- */
/* Begger-style utility/QoL mods — the plausible "everyone has these" layer. */
const BEGGER = [
  ["BetterWeather", "184320"], ["AutoCraft", "307200"], ["FastLogin", "258048"],
  ["HealthBar", "196608"], ["RainBoost", "229376"], ["AutoEnchant", "235520"],
  ["AntiKill", "311296"], ["FastBreak", "225280"], ["AutoSneak", "245760"],
  ["LongPunch", "314112"], ["AimCompensate", "212992"], ["BedRocket", "294912"],
  ["Hog", "327680"], ["AutoArmor", "286720"], ["FastDrops", "262144"],
  ["Knockback", "303104"], ["FastWater", "253952"], ["AutoPotion", "322560"],
  ["FastMine", "270336"], ["AutoPing", "282240"], ["GammaSync", "198656"],
  ["NoFall", "241664"], ["AutoTool", "289792"], ["BlockReachLite", "207872"]
];
/* mid tier: performance / cosmetics / utility */
const MIDPOOL = [
  ["OptiFine", "1.2 MB"], ["Sodium", "2.1 MB"], ["Iris", "1.8 MB"],
  ["Lithium", "512 KB"], ["Phosphor", "704 KB"], ["Starlight", "1.1 MB"],
  ["FerriteCore", "384 KB"], ["ModMenu", "292 KB"], ["Just Enough Items", "1.4 MB"],
  ["JourneyMap", "3.2 MB"], ["XaeroMinimap", "2.6 MB"], ["AppleSkin", "256 KB"],
  ["Roughly Enough Items", "1.9 MB"], ["Fabric API", "1.5 MB"], ["Fabric Language Kotlin", "1.2 MB"],
  ["Kotlin for Forge", "890 KB"], ["Architectury", "1.6 MB"], ["Cloth Config", "218 KB"],
  ["Continuity", "1.3 MB"], ["Entity Model Features", "940 KB"], ["Entity Texture Features", "612 KB"],
  ["ImmediatelyFast", "1.1 MB"], ["LazyDFU", "448 KB"], ["Nursery", "512 KB"],
  ["Particle Storm", "1.4 MB"], ["Enhanced Block Entities", "2.8 MB"], ["Culling", "688 KB"],
  ["Sodium Extra", "1.7 MB"], ["Not Enough Animations", "1.5 MB"], ["Continuity Extra", "820 KB"],
  ["Chime", "144 KB"], ["Sound Physics", "1.1 MB"], ["ReplayMod", "2.4 MB"],
  ["Blur", "176 KB"], ["Custom Title Screen", "1.9 MB"], ["Custom Nether Portals", "2.1 MB"],
  ["Distant Horizons", "4.4 MB"], ["FogRenderer", "0 KB"], ["Bubbles", "204 KB"],
  ["Wool Colors", "168 KB"], ["Connected Textures", "3.1 MB"], ["Fast Suite", "1.3 MB"]
];

/* the two cheats, named as plainly as any other jar.
 * NB: the cheat client is "Echo"; "FreeEcho" is the unrelated staff scanning
 * tool listed on tools.html. The names are deliberately easy to confuse. */
const CHEATS = [
  ["echo-1.8.jar", "1.9 MB"],
  ["doomsday-client-4.2.jar", "2.7 MB"]
];

function dirLine(date, size, name) {
  return BT + date + "  " + size.padStart(12) + "  " + name + BT;
}

/* ---------- build one mod folder listing ---------- */
function folderLines(tier, cheatCount, seed) {
  const r = rng(seed);
  const lines = [];
  const push = (name, size, day) =>
    lines.push("2026-05-04 12:22  " + size.padStart(12) + "  " + name);
  if (tier === "begger") {
    BEGGER.slice(0, 22).forEach(function (m) { push(m[0] + "-1.8.jar", m[1]); });
  } else if (tier === "mid") {
    MIDPOOL.slice(0, 64).forEach(function (m) { push(m[0] + "-1.20.jar", m[1]); });
  } else {
    // max tier: a full Begger/pack dump — 128 jars, cheats buried in the middle
    for (let i = 0; i < 128; i++) {
      let name, size;
      if (i >= 57 && i < 57 + cheatCount) {
        const c = CHEATS[i - 57];
        name = c[0]; size = c[1];
      } else {
        const pool = MIDPOOL[i % MIDPOOL.length];
        const suffix = i % 7 === 3 ? "-extra" : i % 11 === 5 ? "-fix" : "";
        name = pool[0].toLowerCase().replace(/[^a-z0-9]+/g, "-") + suffix + "-1.20.jar";
        size = (60 + Math.floor(r() * 3800)) + " KB";
      }
      push(name, size);
    }
  }
  return lines;
}

/* ---------- assemble machines.js ---------- */
function buildCase(id, seed, opts) {
  const r = rng(seed);
  const rows = [];
  let pid = 400 + Math.floor(r() * 900);
  const nextPid = () => (pid += 4 + Math.floor(r() * 40));

  function row(entry, item) {
    const mem = entry[2] || (8 + Math.floor(r() * 400));
    const cpu = (entry[3] + r() * 0.4).toFixed(2);
    return {
      name: entry[0], pid: nextPid(), sess: entry[4] === "SYSTEM" ? 0 : 1,
      mem: mem >= 1024 ? (mem / 1024).toFixed(1) + " MB" : mem + " KB",
      cpu: cpu + "%", user: entry[4], pub: entry[1],
      mods: entry[5], item: item || undefined
    };
  }

  // base pool (skip zero-memory placeholders — they get added as repeats below)
  POOL.forEach(function (e) {
    if (e[2] === 0) return;
    const hit = opts.named && opts.named[e[0]];
    rows.push(row(hit ? Object.assign([], e, { 2: e[2] }) : e, hit ? hit.item : undefined));
  });
  // repeats to reach a realistic total
  const repeats = [
    [CHROME, 9], [DISCORD, 5], [EDGEWEB, 3], [SVCHOST, 6],
    [WMIPRVSE, 2], [CONHOST, 3]
  ];
  repeats.forEach(function (pair) {
    for (let i = 0; i < pair[1]; i++) {
      const e = pair[0].slice();
      e[0] = pair[0][0] + (i ? "" : "");
      rows.push(row(e));
    }
  });

  // splice the case's own citable processes in at scattered depths
  (opts.own || []).forEach(function (o) {
    const at = o.at != null ? o.at : rows.length - 2;
    rows.splice(Math.min(at, rows.length), 0, o.row);
  });

  return rows;
}

const CASES = {
  blatant: { seed: 90210, own: [
    { at: 41, row: { name: "javaw.exe", pid: 7412, sess: 1, mem: "2.3 GB", cpu: "8.45%", user: "Steven",
      pub: "Oracle Corporation", mods: ["jvm.dll", "java_crash.dll", "netman.dll", "VKMSPLUGIN.DLL", "lwjgl64.dll"],
      item: "p_javaw" } },
    { at: 88, row: { name: "injector.exe", pid: 9840, sess: 1, mem: "23.6 MB", cpu: "1.20%", user: "Steven",
      pub: "(no signature)", mods: ["KERNEL32.DLL", "ntdll.dll", "ADVAPI32.dll", "PSAPI.DLL", "ws2_32.dll"],
      item: "p_injector" } },
    { at: 12, row: { name: "powershell.exe", pid: 7004, sess: 1, mem: "66.5 MB", cpu: "0.45%", user: "Steven",
      pub: "Microsoft Corporation", mods: ["ntdll.dll", "System.Management.Automation.dll", "CRYP32.dll", "WINHTTP.dll", "BROWSCAN.dll"],
      item: "p_powershell" } },
    { at: 66, row: { name: "awd.exe", pid: 7741, sess: 1, mem: "30.0 MB", cpu: "0.85%", user: "Steven",
      pub: "(no signature)", mods: ["ntdll.dll", "D3D12.dll", "DXGI.DLL", "VCRUNTIME140.dll", "wininet.dll"],
      item: "p_awd_os" } },
    { at: 93, row: { name: "dpf.exe", pid: 8322, sess: 1, mem: "12.0 MB", cpu: "0.30%", user: "Steven",
      pub: "(no signature)", mods: ["ntdll.dll", "D3D12.dll", "DXGI.DLL", "d3d11.dll", "user32.dll"],
      item: "p_dpf_exe" } }
  ]},
  ghost: { seed: 31337, own: [
    { at: 38, row: { name: "javaw.exe", pid: 5528, sess: 1, mem: "2.4 GB", cpu: "2.17%", user: "Steven",
      pub: "Oracle Corporation", mods: ["jvm.dll", "netman.dll", "VKMSPLUGIN.DLL", "lwjgl64.dll"],
      item: "p_javaw2" } },
    { at: 71, row: { name: "EDAC.exe", pid: 10445, sess: 1, mem: "20.0 MB", cpu: "0.15%", user: "Steven",
      pub: "(no signature)", mods: ["ntdll.dll", "D3D12.dll", "DXGI.DLL", "V{diagoverlay}.dll", "user32.dll"],
      item: "p_edac" } },
    { at: 22, row: { name: "obs64.exe", pid: 9012, sess: 1, mem: "66.5 MB", cpu: "0.80%", user: "Steven",
      pub: "OBS Project", mods: ["obs64.exe", "d3d11.dll", "winmm.dll", "dwrite.dll"], item: "p_obs" } }
  ]},
  clean: { seed: 5150, own: [
    { at: 44, row: { name: "javaw.exe", pid: 6604, sess: 1, mem: "2.4 GB", cpu: "3.20%", user: "Steven",
      pub: "Oracle Corporation", mods: ["jvm.dll", "netman.dll", "VKMSPLUGIN.DLL", "lwjgl64.dll"],
      item: "p_javaw3" } },
    { at: 79, row: { name: "python.exe", pid: 8120, sess: 1, mem: "12.0 MB", cpu: "0.00%", user: "Steven",
      pub: "Python Software Foundation", mods: ["ntdll.dll", "python312.dll", "WS2_32.dll", "VCRUNTIME140.dll"],
      item: "p_python" } }
  ]}
};

/* mod folders per case */
const FOLDERS = {
  blatant: [
    { id: "mf_begger", label: "mods-begg-1.8", count: 22, folder: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods-begg-1.8\\",
      meta: "22 jars · 2026-05-04", kind: "neutral", lines: folderLines("begger", 0, 1) },
    { id: "mf_mid", label: "mods-hx-1.20", count: 64, folder: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods-hx-1.20\\",
      meta: "64 jars · 2026-05-04", kind: "neutral", lines: folderLines("mid", 0, 2) },
    { id: "mf_max", label: "mods-zeta-1.20", count: 128, folder: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods-zeta-1.20\\",
      meta: "128 jars · 2026-09-14", kind: "neutral", lines: folderLines("max", 2, 3) }
  ],
  ghost: [
    { id: "mf_gone", label: "mods-zeta-1.20", count: 0, folder: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods-zeta-1.20\\",
      meta: "0 jars · directory removed 2026-09-30 22:14", kind: "neutral", lines: null }
  ],
  clean: [
    { id: "mf_begg3", label: "mods-begg-1.8", count: 22, folder: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods-begg-1.8\\",
      meta: "22 jars · 2026-05-04", kind: "neutral", lines: folderLines("begger", 0, 4) }
  ]
};

/* ---------- emit ---------- */
/* Backtick-quoted literal for the generated file: backslashes and backticks escaped. */
function q(s) {
  return BT + String(s).replace(/\\/g, "\\\\").replace(/`/g, "\\`") + BT;
}

let out = "";
out += "/* SS Academy - machine wall. GENERATED by tools/gen-machines.js - do not hand-edit.\n";
out += " * Per case: a full Task Manager (Name/PID/Session/Memory/CPU/User) and the mod\n";
out += " * folders found on the instance. Rows carrying `item` open the matching evidence\n";
out += " * record; every other row is noise. Nothing in here labels a process or a jar -\n";
out += " * the checker has to read the output and decide for themselves.\n";
out += " */\n";
out += "window.MACHINES = {\n";
Object.keys(CASES).forEach(function (id, idx) {
  const rows = buildCase(id, CASES[id].seed, CASES[id]);
  out += "  " + id + ": {\n";
  out += "    taskmgr: [\n";
  rows.forEach(function (row) {
    out += "      { n: " + q(row.name) + ", pid: " + row.pid + ", sess: " + row.sess +
      ", mem: " + q(row.mem) + ", cpu: " + q(row.cpu) +
      ", user: " + q(row.user) + ", pub: " + q(row.pub) +
      ", mods: [" + row.mods.map(q).join(", ") + "]" +
      (row.item ? ", item: " + q(row.item) : "") + " },\n";
  });
  out += "    ],\n";
  out += "    modFolders: [\n";
  FOLDERS[id].forEach(function (f) {
    out += "      { id: " + q(f.id) + ", label: " + q(f.label) + ", count: " + f.count +
      ", folder: " + q(f.folder) + ", meta: " + q(f.meta) + ", kind: " + q(f.kind) +
      ", lines: " + (f.lines ? "[" + f.lines.map(q).join(", ") + "]" : "null") + " },\n";
  });
  out += "    ]\n";
  out += "  }" + (idx < Object.keys(CASES).length - 1 ? "," : "") + "\n";
});
out += "};\n";

const dest = path.join(__dirname, "..", "assets", "machines.js");
fs.writeFileSync(dest, out, "utf8");

/* report */
console.log("wrote " + dest);
Object.keys(CASES).forEach(function (id) {
  const rows = buildCase(id, CASES[id].seed, CASES[id]);
  const own = rows.filter(function (r) { return r.item; }).length;
  console.log("  " + id.padEnd(9) + " taskmgr rows=" + rows.length + " (own/citable=" + own + ")" +
    "  modFolders=" + FOLDERS[id].map(function (f) { return f.label + "(" + f.count + ")"; }).join(" "));
});
