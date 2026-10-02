/* SS Academy — simulator engine (plain script, works from file://)
 * Mini-game loop: pick mode → run protocol tests → handle the suspect on comms
 * → cite verified evidence → field test → verdict → scored debrief.
 */
(function () {
  "use strict";

  var SCORES_KEY = "ssacademy.scores";
  var TURN_AT = 12; // actions before the suspect applies pressure

  var PANELS = [
    { key: "files", label: "FILES", sub: "File explorer" },
    { key: "processes", label: "PROCESSES", sub: "Task manager" },
    { key: "services", label: "SERVICES", sub: "Windows services" },
    { key: "installed", label: "INSTALLED", sub: "Programs & features" },
    { key: "startup", label: "STARTUP", sub: "Run entries" },
    { key: "scan", label: "SCAN TOOL", sub: "Automated detection" }
  ];

  /* test key -> scenario array name (for derived results) */
  var TEST_PROP = { proc: "processes", files: "files", serv: "services", star: "startup", inst: "installed" };

  var state = {
    mode: "tools",
    scenario: null,
    panel: "files",
    inspected: {},
    flagged: {},
    rightsSeen: {},
    rights: 0,
    scanStarted: false,
    scanShown: 0,
    scanDone: false,
    verdict: null,
    tests: {},          // key -> { state: "idle"|"running"|"done", result: "" }
    logs: [],
    conductMiss: 0,
    actions: 0,
    quiz: null,         // chosen option indexes after submit
    quizPick: {},
    appeal: null,       // chosen option indexes per challenge
    appealPick: {},
    struck: {},         // citation id -> true (panel didn't buy it)
    beatQueue: [],
    activeBeat: null,
    activeCtx: null,
    beatTest: null,
    beatsFired: {}
  };

  var pendingItem = null;
  var scanTimers = [];
  var clockTimer = null;
  var clockStart = null;

  function $(id) { return document.getElementById(id); }

  /* ---------- scores ---------- */

  function loadScores() {
    try { return JSON.parse(localStorage.getItem(SCORES_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveScore(sc, score, grade) {
    var all = loadScores();
    var key = sc.id + "|" + state.mode;
    var prev = all[key];
    if (!prev || score > prev.score) all[key] = { score: score, grade: grade };
    try { localStorage.setItem(SCORES_KEY, JSON.stringify(all)); } catch (e) { /* private mode */ }
  }

  /* ---------- helpers ---------- */

  var _indexCache = { id: null, map: null };
  function itemIndex(sc) {
    if (_indexCache.id === sc.id && _indexCache.map) return _indexCache.map;
    var map = {};
    PANELS.forEach(function (p) {
      var arr = p.key === "scan" ? sc.scan.results : (sc[p.key] || []);
      arr.forEach(function (it) { it._panel = p.key; map[it.id] = it; });
    });
    _indexCache = { id: sc.id, map: map };
    return map;
  }

  function modeMeta(key) {
    var ms = window.MODES || [];
    for (var i = 0; i < ms.length; i++) if (ms[i].key === key) return ms[i];
    return ms[0];
  }
  function testsForMode() {
    return (window.TESTS || []).filter(function (t) {
      return !t.modes || t.modes.indexOf(state.mode) !== -1;
    });
  }
  function testByKey(key) {
    var ts = window.TESTS || [];
    for (var i = 0; i < ts.length; i++) if (ts[i].key === key) return ts[i];
    return null;
  }
  function visiblePanels() {
    return PANELS.filter(function (p) { return p.key !== "scan" || state.mode === "tools"; });
  }
  function panelLabel(key) {
    var ps = visiblePanels();
    for (var i = 0; i < ps.length; i++) if (ps[i].key === key) return ps[i].label;
    return key.toUpperCase();
  }
  function flaggedIds() { return Object.keys(state.flagged); }
  function markAction() {
    state.actions += 1;
    if (state.actions >= TURN_AT) fireTrigger("turn:" + TURN_AT);
  }

  /* ---------- mode select ---------- */

  function renderModes() {
    var grid = $("mode-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (window.MODES || []).forEach(function (m) {
      var b = document.createElement("button");
      b.className = "mode-card" + (m.key === state.mode ? " picked" : "");
      var bl = "";
      (m.bullets || []).forEach(function (x) { bl += "<li>" + x + "</li>"; });
      b.innerHTML =
        '<span class="mode-tag">' + m.tag + "</span>" +
        '<span class="mode-name">' + m.name + "</span>" +
        '<span class="mode-sub">' + m.sub + "</span>" +
        '<span class="mode-desc">' + m.desc + "</span>" +
        '<ul class="mode-bullets">' + bl + "</ul>";
      b.addEventListener("click", function () {
        state.mode = m.key;
        renderModes();
        renderModeBadge();
        renderSelect();
      });
      grid.appendChild(b);
    });
  }

  function renderModeBadge() {
    var badge = $("mode-badge");
    if (badge) badge.textContent = modeMeta(state.mode).name;
  }

  /* ---------- case select ---------- */

  function renderSelect() {
    var scores = loadScores();
    var grid = $("case-grid");
    if (!grid) return;
    grid.innerHTML = "";
    (window.SCENARIOS || []).forEach(function (sc) {
      var best = scores[sc.id + "|" + state.mode];
      var card = document.createElement("button");
      card.className = "case-card";
      card.innerHTML =
        '<span class="case-num">CASE ' + sc.num + "</span>" +
        '<span class="case-diff">' + sc.diff + "</span>" +
        '<span class="case-title">' + sc.title + "</span>" +
        '<span class="case-tag">' + sc.tagline + "</span>" +
        (best
          ? '<span class="case-best best-pass">BEST: ' + best.score + "/100 · " + best.grade + "</span>"
          : '<span class="case-best">NOT ATTEMPTED</span>');
      card.addEventListener("click", function () { openBriefing(sc); });
      grid.appendChild(card);
    });
  }

  /* ---------- briefing ---------- */

  function openBriefing(sc) {
    $("brief-report").textContent = sc.report;
    $("brief-mode").textContent = modeMeta(state.mode).name;
    var ol = $("brief-steps");
    ol.innerHTML = "";
    testsForMode().forEach(function (t) {
      var li = document.createElement("li");
      var b = document.createElement("b");
      b.textContent = t.label;
      var s = document.createElement("small");
      s.textContent = t.sub;
      li.appendChild(b);
      li.appendChild(s);
      ol.appendChild(li);
    });
    $("briefing").hidden = false;
    $("briefing").dataset.scen = sc.id;
  }

  /* ---------- session setup ---------- */

  function resetCase(sc) {
    state.scenario = sc;
    state.panel = "files";
    state.inspected = {};
    state.flagged = {};
    state.rightsSeen = {};
    state.rights = 0;
    state.scanStarted = false;
    state.scanShown = 0;
    state.scanDone = false;
    state.verdict = null;
    state.logs = [];
    state.conductMiss = 0;
    state.actions = 0;
    state.quiz = null;
    state.quizPick = {};
    state.appeal = null;
    state.appealPick = {};
    state.struck = {};
    state.beatQueue = [];
    state.activeBeat = null;
    state.activeCtx = null;
    state.beatTest = null;
    state.beatsFired = {};
    state.tests = {};
    testsForMode().forEach(function (t) { state.tests[t.key] = { state: "idle", result: "" }; });
    scanTimers.forEach(clearTimeout);
    scanTimers = [];
    stopClock();
    pendingItem = null;
  }

  function suspectName() {
    var s = window.SUSPECTS || {};
    return state.scenario ? (s[state.scenario.id] || "SUSPECT") : "SUSPECT";
  }

  function beginCase(sc) {
    resetCase(sc);
    $("case-select").hidden = true;
    $("case-view").hidden = false;
    $("case-title").textContent = "CASE " + sc.num + " — " + sc.title;
    $("mode-chip").textContent = modeMeta(state.mode).tag;
    $("talk-name").textContent = suspectName();
    $("rec-chip").textContent = "○ REC OFF";
    $("rec-chip").classList.remove("live");
    $("talk-feed").innerHTML = '<span class="empty">Channel open. The suspect talks while you work — what you say back is scored too.</span>';
    $("talk-options").innerHTML = "";
    renderNav();
    renderPanel();
    renderCaseFile();
    renderTests();
    renderLog();
    addMsg("sys", "REMOTE SESSION OPEN · official remote tool · " + suspectName() + " sees every click");
    fireTrigger("start");
  }

  /* ---------- comms / dialogue ---------- */

  function clearFeedEmpty() {
    var empty = document.querySelector("#talk-feed .empty");
    if (empty) empty.remove();
  }
  function scrollFeed() {
    var f = $("talk-feed");
    f.scrollTop = f.scrollHeight;
  }
  function addMsg(who, text) {
    clearFeedEmpty();
    var feed = $("talk-feed");
    var d = document.createElement("div");
    d.className = "msg " + who;
    var w = document.createElement("span");
    w.className = "who";
    w.textContent = who === "suspect" ? suspectName() + " · SUSPECT" : who === "you" ? "YOU · CHECKER" : "SYSTEM";
    d.appendChild(w);
    d.appendChild(document.createTextNode(text));
    feed.appendChild(d);
    scrollFeed();
  }
  function addNote(kind, text) {
    clearFeedEmpty();
    var feed = $("talk-feed");
    var d = document.createElement("div");
    d.className = "msg-note" + (kind === "good" ? " good" : "");
    d.textContent = text;
    feed.appendChild(d);
    scrollFeed();
  }

  function beatPool() {
    return (window.BEATS || []).filter(function (b) {
      return !b.scen || (state.scenario && b.scen === state.scenario.id);
    });
  }
  function fireTrigger(trig, ctx) {
    var pool = beatPool().filter(function (b) { return b.when === trig && !state.beatsFired[b.id]; });
    if (!pool.length) return;
    pushBeat(pool[0], ctx);
  }
  function pushBeat(beat, ctx) {
    if (state.activeBeat) resolveActive(true); // a newer moment outranks an unanswered one
    state.beatsFired[beat.id] = true;
    state.beatQueue.push({ beat: beat, ctx: ctx || null });
    drainBeats();
  }
  function drainBeats() {
    var wrap = $("talk-options");
    if (state.activeBeat) return;
    if (!state.beatQueue.length) { wrap.innerHTML = ""; return; }
    var entry = state.beatQueue.shift();
    state.activeBeat = entry.beat;
    state.activeCtx = entry.ctx;
    addMsg("suspect", entry.beat.line);
    wrap.innerHTML = '<span class="opt-hint">How do you answer?</span>';
    entry.beat.options.forEach(function (o, i) {
      var btn = document.createElement("button");
      btn.className = "opt";
      btn.textContent = o.t;
      btn.addEventListener("click", function () { chooseOption(i); });
      wrap.appendChild(btn);
    });
  }
  function resolveActive(silent) {
    if (!state.activeBeat) return;
    var bt = state.beatTest;
    state.activeBeat = null;
    state.activeCtx = null;
    state.beatTest = null;
    $("talk-options").innerHTML = "";
    if (bt) finishTest(bt);
    drainBeats();
  }

  function chooseOption(i) {
    var b = state.activeBeat;
    if (!b) return;
    var o = b.options[i];
    var ctx = state.activeCtx;

    addMsg("you", o.t);
    if (o.reply) addMsg("suspect", o.reply);
    if (o.tag === "bad") {
      state.conductMiss += 1;
      if (o.why) addNote("bad", "✖ " + o.why);
    } else if (o.why) {
      addNote("good", "✓ " + o.why);
    }

    var act = o.act;
    var bt = state.beatTest;
    state.activeBeat = null;
    state.activeCtx = null;
    state.beatTest = null;
    $("talk-options").innerHTML = "";

    if (act === "close" || act === "proceed") {
      applyRightsDecision(act);
    } else if (act === "uncite" && ctx) {
      delete state.flagged[ctx];
      addNote("good", "Withdrawn from the report — you can defend everything that's left.");
      renderCaseFile();
      renderPanel();
    }
    // act "keep": the cite stays, the miss is already counted

    if (bt) finishTest(bt);
    markAction();
    syncVerify();
    drainBeats();
  }

  function pushRightsBeat(item) {
    if (state.beatsFired.rightsobj) return;
    pushBeat({
      id: "rightsobj",
      line: "hey — that's my browser history. that's private, you don't need that, do you?",
      options: [
        { t: "You're right — that's yours to refuse. Closing it.", tag: "good", reply: "…okay. thanks.", act: "close" },
        { t: "It's already open on screen, might as well take a quick look.", tag: "bad", act: "proceed",
          why: "It is never \"already open\". Opening a refusal-right search is a procedural breach that can void the whole session." },
        { t: "Give me your password and I'll only skim the one thing I need.", tag: "bad", act: "proceed",
          why: "Asking for credentials is outright disqualifying — and it's now on the recording beside your voice." }
      ]
    }, item.id);
  }

  /* ---------- protocol tests ---------- */

  function renderTests() {
    var wrap = $("test-chips");
    if (!wrap) return;
    wrap.innerHTML = "";
    var list = testsForMode();
    var done = 0;
    list.forEach(function (t) {
      var s = state.tests[t.key] || { state: "idle" };
      if (s.state === "done") done += 1;
      var b = document.createElement("button");
      b.className = "tchip " + s.state + (t.auto ? " auto" : "");
      b.title = t.sub + (t.auto ? " — completes itself when the scan's hits are verified" : "");
      var st = document.createElement("span");
      st.className = "tstate";
      st.textContent = s.state === "done" ? "✓" : s.state === "running" ? "◐" : t.auto ? "◇" : "○";
      b.appendChild(st);
      b.appendChild(document.createTextNode(t.label));
      if (s.state === "running") {
        var bar = document.createElement("span");
        bar.className = "bar";
        bar.style.setProperty("--dur", (t.dur || 900) + "ms");
        b.appendChild(bar);
      }
      if (t.auto || s.state !== "idle") b.disabled = true;
      b.addEventListener("click", function () { runTest(t.key); });
      wrap.appendChild(b);
    });
    $("tests-count").textContent = done + "/" + list.length;
  }

  function runTest(key) {
    var t = testByKey(key);
    var s = state.tests[key];
    if (!t || !s || s.state !== "idle") return;

    if (t.beat) {
      s.state = "running";
      renderTests();
      state.beatTest = key;
      fireTrigger("test:" + key, null);
      return;
    }

    s.state = "running";
    renderTests();

    if (t.action === "scan") {
      state.panel = "scan";
      renderNav();
      renderPanel();
      runScan();
      return;
    }
    scanTimers.push(setTimeout(function () { finishTest(key); }, t.dur || 800));
  }

  function finishTest(key) {
    var t = testByKey(key);
    var s = state.tests[key];
    if (!t || !s || s.state === "done") return;
    s.state = "done";
    s.result = testResult(t);
    state.logs.push({
      key: key,
      label: t.label,
      text: s.result,
      panel: t.panel,
      hit: /does not resolve|MISMATCH|ANOMALY|not found|critical/i.test(s.result)
    });
    renderTests();
    renderLog();
    if (key === "rec") startClock();
    markAction();
    fireTrigger("test:" + key, null);
    syncVerify();
  }

  function testResult(t) {
    var sc = state.scenario;
    var ov = (window.TEST_RESULT_OVERRIDE || {})[sc.id] || {};
    if (ov[t.key]) return ov[t.key];
    var def = window.TEST_RESULT_DEFAULT || {};
    if (t.key === "scan") {
      return "scan complete · " + sc.scan.results.length + " findings · scan.log written";
    }
    if (t.key === "verify") {
      var total = state.scenario.scan.results.length;
      var opened = state.scenario.scan.results.filter(function (it) { return state.inspected[it.id]; }).length;
      return opened + "/" + total + " findings opened by hand";
    }
    if (def[t.key]) return def[t.key];
    var prop = TEST_PROP[t.key];
    var arr = prop ? (sc[prop] || []) : [];
    return arr.length + " rows enumerated → " + panelLabel(prop);
  }

  function renderLog() {
    var el = $("test-log");
    if (!el) return;
    el.innerHTML = "";
    if (!state.logs.length) {
      el.innerHTML = '<span class="muted">No tests run yet — start with the recording.</span>';
      return;
    }
    state.logs.forEach(function (l) {
      var d = document.createElement("div");
      d.className = "tlog-line " + (l.hit ? "hit" : "ok");
      var b = document.createElement("b");
      b.textContent = l.label;
      d.appendChild(b);
      d.appendChild(document.createTextNode(" — " + l.text));
      if (l.panel && l.panel !== state.panel) {
        var go = document.createElement("button");
        go.className = "tlink";
        go.textContent = "OPEN →";
        go.addEventListener("click", function () {
          state.panel = l.panel;
          renderNav();
          renderPanel();
        });
        d.appendChild(go);
      }
      el.appendChild(d);
    });
    el.scrollTop = el.scrollHeight;
  }

  function syncVerify() {
    var s = state.tests.verify;
    if (!s || s.state !== "idle" || !state.scanDone) return;
    var allOpen = state.scenario.scan.results.every(function (it) { return state.inspected[it.id]; });
    if (allOpen) finishTest("verify");
  }

  /* ---------- clock ---------- */

  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tickClock() {
    var s = Math.floor((Date.now() - clockStart) / 1000);
    var chip = $("rec-chip");
    if (chip) chip.textContent = "● REC " + pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }
  function startClock() {
    clockStart = Date.now();
    $("rec-chip").classList.add("live");
    tickClock();
    if (clockTimer) clearInterval(clockTimer);
    clockTimer = setInterval(tickClock, 1000);
  }
  function stopClock() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
    clockStart = null;
  }

  /* ---------- nav + panels ---------- */

  function renderNav() {
    var nav = $("panel-nav");
    nav.innerHTML = "";
    if (state.panel === "scan" && state.mode !== "tools") state.panel = "files";
    visiblePanels().forEach(function (p) {
      var b = document.createElement("button");
      b.className = "panel-tab" + (p.key === state.panel ? " active" : "");
      b.innerHTML = '<span class="tab-label">' + p.label + '</span><span class="tab-sub">' + p.sub + "</span>";
      b.addEventListener("click", function () {
        state.panel = p.key;
        renderNav();
        renderPanel();
      });
      nav.appendChild(b);
    });
  }

  function rowEl(it) {
    var row = document.createElement("button");
    row.className = "row" + (state.flagged[it.id] ? " cited" : "");
    var sub = it.path || it.meta || "";
    row.innerHTML =
      '<span class="row-main"><span class="row-title">' + it.title + "</span>" +
      (sub ? '<span class="row-sub">' + sub + "</span>" : "") + "</span>" +
      (state.flagged[it.id] ? '<span class="row-badge">CITED</span>' : "");
    row.addEventListener("click", function () { openItem(it.id); });
    return row;
  }

  function renderPanel() {
    var sc = state.scenario;
    var body = $("panel-body");
    body.innerHTML = "";
    var meta = visiblePanels().filter(function (p) { return p.key === state.panel; })[0] || PANELS[0];

    var head = document.createElement("div");
    head.className = "panel-head";
    head.innerHTML = "<h3>" + meta.label + "</h3><p>" + panelBlurb(state.panel) + "</p>";
    body.appendChild(head);

    if (state.panel === "scan") { renderScan(body); return; }

    var list = document.createElement("div");
    list.className = "rows";
    (sc[state.panel] || []).forEach(function (it) { list.appendChild(rowEl(it)); });
    body.appendChild(list);
  }

  function panelBlurb(key) {
    switch (key) {
      case "files": return "Browse the machine. Open anything that looks worth a second look.";
      case "processes": return "What is running right now — with command lines.";
      case "services": return "Disabled services = deleted forensic trail = attempted bypass.";
      case "installed": return "Programs & features, with install dates.";
      case "startup": return "What runs at login — persistence lives here.";
      case "scan": return "Automated output is a lead, never a verdict.";
      default: return "";
    }
  }

  function renderScan(body) {
    var sc = state.scenario;
    var wrap = document.createElement("div");
    wrap.className = "scan-wrap";

    var blurb = document.createElement("p");
    blurb.className = "scan-blurb";
    blurb.textContent = sc.scan.blurb;
    wrap.appendChild(blurb);

    if (!state.scanStarted) {
      var btn = document.createElement("button");
      btn.className = "btn btn-accent";
      btn.textContent = "RUN SCAN";
      btn.addEventListener("click", runScan);
      wrap.appendChild(btn);
      body.appendChild(wrap);
      return;
    }

    var stage = document.createElement("div");
    stage.className = "rows";
    sc.scan.results.slice(0, state.scanShown).forEach(function (it) { stage.appendChild(rowEl(it)); });
    if (state.scanShown < sc.scan.results.length) {
      var wait = document.createElement("div");
      wait.className = "scan-wait";
      wait.textContent = "scanning…";
      stage.appendChild(wait);
    } else {
      var done = document.createElement("div");
      done.className = "scan-done";
      done.textContent = "scan complete · " + sc.scan.results.length + " line items — verify anything you intend to cite";
      stage.appendChild(done);
    }
    wrap.appendChild(stage);
    body.appendChild(wrap);
  }

  function runScan() {
    if (state.mode !== "tools") return;
    var s = state.tests.scan;
    if (s && s.state === "idle") { s.state = "running"; renderTests(); }
    if (state.scanStarted) return;
    state.scanStarted = true;
    state.scanShown = 0;
    renderPanel();
    var sc = state.scenario;
    sc.scan.results.forEach(function (_, i) {
      scanTimers.push(setTimeout(function () {
        state.scanShown = i + 1;
        if (state.panel === "scan") renderPanel();
        if (state.scanShown >= sc.scan.results.length) {
          state.scanDone = true;
          var st = state.tests.scan;
          if (st && st.state === "running") finishTest("scan");
          syncVerify();
        }
      }, 650 * (i + 1)));
    });
  }

  /* ---------- item viewer ---------- */

  function openItem(id) {
    var sc = state.scenario;
    var it = itemIndex(sc)[id];
    if (!it) return;
    pendingItem = it;
    if (!state.inspected[id]) {
      state.inspected[id] = true;
      markAction();
    }

    $("modal-title").textContent = it.title;
    $("modal-sub").textContent = it.path || it.meta || "";
    $("modal-meta").textContent = it.path ? (it.meta || "") : "";

    var isRights = it.kind === "rights" && !state.rightsSeen[id];
    $("rights-warn").hidden = !isRights;
    $("modal-detail").hidden = isRights;
    $("modal-actions").hidden = isRights;

    if (isRights) {
      pushRightsBeat(it);
    } else {
      $("modal-detail").textContent = it.detail;
      var breach = it.kind === "rights";
      $("breach-tag").hidden = !breach;
      $("btn-flag").hidden = breach;
      if (!breach) {
        var btn = $("btn-flag");
        btn.className = "btn " + (state.flagged[id] ? "btn-warn" : "btn-accent");
        btn.textContent = state.flagged[id] ? "✕ REMOVE FROM CASE FILE" : "⚑ CITE AS EVIDENCE";
      }
    }

    $("modal").hidden = false;
    syncVerify();
  }

  function rightsProceed() {
    if (!pendingItem) return;
    if (!state.rightsSeen[pendingItem.id]) {
      state.rightsSeen[pendingItem.id] = true;
      state.rights += 1;
    }
    $("rights-warn").hidden = true;
    $("modal-detail").hidden = false;
    $("modal-detail").textContent = pendingItem.detail;
    $("modal-actions").hidden = false;
    $("breach-tag").hidden = false;
    $("btn-flag").hidden = true;
    renderCaseFile();
  }

  /* rights decision from either the modal buttons or the comms answer */
  function applyRightsDecision(act) {
    if (act === "close") closeModal();
    else rightsProceed();
  }

  function closeModal() {
    $("modal").hidden = true;
    pendingItem = null;
    renderPanel();
    renderCaseFile();
  }

  function toggleFlag() {
    if (!pendingItem) return;
    var id = pendingItem.id;
    var adding = !state.flagged[id];
    if (adding) state.flagged[id] = true;
    else delete state.flagged[id];
    var btn = $("btn-flag");
    btn.className = "btn " + (state.flagged[id] ? "btn-warn" : "btn-accent");
    btn.textContent = state.flagged[id] ? "✕ REMOVE FROM CASE FILE" : "⚑ CITE AS EVIDENCE";
    renderCaseFile();
    renderPanel();
    if (adding) {
      markAction();
      fireTrigger("cite:" + id, id);
    }
    syncVerify();
  }

  /* ---------- case file ---------- */

  function renderCaseFile() {
    var list = $("flagged-list");
    list.innerHTML = "";
    var ids = flaggedIds();
    if (ids.length === 0) {
      list.innerHTML = '<p class="muted empty">No evidence cited yet.</p>';
    } else {
      var map = itemIndex(state.scenario);
      ids.forEach(function (id) {
        var it = map[id];
        if (!it) return;
        var li = document.createElement("li");
        li.innerHTML = "<span>" + it.title + "</span>";
        var x = document.createElement("button");
        x.className = "chip-x";
        x.textContent = "✕";
        x.title = "Remove";
        x.addEventListener("click", function () { delete state.flagged[id]; renderCaseFile(); renderPanel(); });
        li.appendChild(x);
        list.appendChild(li);
      });
    }
    var badge = $("rights-badge");
    badge.hidden = state.rights === 0;
    badge.textContent = "⚠ " + state.rights + " PROCEDURAL VIOLATION" + (state.rights > 1 ? "S" : "");
    $("btn-verdict").classList.toggle("btn-danger-flash", state.rights > 0);
  }

  /* ---------- verdict + field test ---------- */

  function openVerdict() {
    var ids = flaggedIds();
    var map = itemIndex(state.scenario);
    var ul = $("verdict-cites");
    ul.innerHTML = "";
    if (ids.length === 0) {
      ul.innerHTML = '<li class="muted">No items cited — allowed, but expect a weak file.</li>';
    } else {
      ids.forEach(function (id) {
        var it = map[id];
        if (it) {
          var li = document.createElement("li");
          li.textContent = it.title;
          ul.appendChild(li);
        }
      });
    }
    var radios = document.querySelectorAll('input[name="verdict"]');
    for (var i = 0; i < radios.length; i++) radios[i].checked = (radios[i].value === state.verdict);
    $("verdict-hint").textContent = "";
    $("verdict-modal").hidden = false;
  }

  function submitVerdict() {
    var sel = document.querySelector('input[name="verdict"]:checked');
    if (!sel) {
      $("verdict-hint").textContent = "Choose a verdict first.";
      return;
    }
    state.verdict = sel.value;
    $("verdict-modal").hidden = true;
    openQuiz();
  }

  function renderQuestionList(wrap, qs, prefix, store, startLabel) {
    wrap.innerHTML = "";
    qs.forEach(function (q, i) {
      var block = document.createElement("div");
      block.className = "q-block";
      var num = document.createElement("div");
      num.className = "q-num";
      num.textContent = startLabel + (i + 1 < 10 ? "0" : "") + (i + 1);
      var qt = document.createElement("div");
      qt.className = "q-text";
      qt.textContent = q.q;
      block.appendChild(num);
      block.appendChild(qt);
      q.opts.forEach(function (opt, j) {
        var lab = document.createElement("label");
        lab.className = "q-opt";
        var input = document.createElement("input");
        input.type = "radio";
        input.name = prefix + i;
        input.value = String(j);
        input.addEventListener("change", function () {
          store[i] = j;
          Array.prototype.forEach.call(block.querySelectorAll(".q-opt"), function (l) { l.classList.remove("picked"); });
          lab.classList.add("picked");
        });
        lab.appendChild(input);
        lab.appendChild(document.createTextNode(opt));
        block.appendChild(lab);
      });
      wrap.appendChild(block);
    });
  }

  function openQuiz() {
    state.quizPick = {};
    renderQuestionList($("quiz-qs"), window.QUIZ[state.scenario.id] || [], "q", state.quizPick, "QUESTION ");
    $("quiz-hint").textContent = "";
    $("quiz-modal").hidden = false;
  }

  function openAppeal() {
    state.appealPick = {};
    renderQuestionList($("appeal-qs"), (window.APPEAL && window.APPEAL[state.scenario.id]) || [], "ap", state.appealPick, "CHALLENGE ");
    $("appeal-hint").textContent = "";
    $("appeal-modal").hidden = false;
  }

  function submitQuiz() {
    var qs = window.QUIZ[state.scenario.id] || [];
    var picks = [];
    for (var i = 0; i < qs.length; i++) {
      var v = state.quizPick[i];
      if (typeof v !== "number") {
        $("quiz-hint").textContent = "Answer all three — they're scored.";
        return;
      }
      picks.push(v);
    }
    state.quiz = picks;
    $("quiz-modal").hidden = true;
    openAppeal();
  }

  function submitAppeal() {
    var qs = (window.APPEAL && window.APPEAL[state.scenario.id]) || [];
    var picks = [];
    for (var i = 0; i < qs.length; i++) {
      var v = state.appealPick[i];
      if (typeof v !== "number") {
        $("appeal-hint").textContent = "Answer all three — the panel waits for no one.";
        return;
      }
      picks.push(v);
    }
    state.appeal = picks;
    state.struck = {};
    qs.forEach(function (q, i) {
      if (q.target && picks[i] !== q.a && state.flagged[q.target]) state.struck[q.target] = true;
    });
    $("appeal-modal").hidden = true;
    renderResults();
  }

  /* ---------- after-action: what the report never touched ---------- */

  function panelNameOf(it) {
    for (var i = 0; i < PANELS.length; i++) if (PANELS[i].key === it._panel) return PANELS[i].label;
    return "";
  }

  function buildReview(sc) {
    var map = itemIndex(sc);
    var missed = [], held = [];
    Object.keys(map).forEach(function (id) {
      var it = map[id];
      var opened = !!state.inspected[id];
      var cited = !!state.flagged[id];
      if (it.kind === "evidence" && !cited) {
        missed.push({ it: it, tag: opened ? "opened, not cited" : "never opened" });
      }
      if (it.kind === "trap" && opened && !cited) {
        held.push({ it: it, tag: "looked the part — stayed out of the report" });
      }
      if (it.kind === "rights" && !state.rightsSeen[id]) {
        held.push({ it: it, tag: "refusal line never crossed" });
      }
    });
    return { missed: missed, held: held };
  }

  function reviewLine(entry) {
    var div = document.createElement("div");
    div.className = "rev-item";
    var b = document.createElement("b");
    b.textContent = entry.it.title;
    var s = document.createElement("span");
    s.textContent = panelNameOf(entry.it) + " · " + (entry.it.path || entry.it.meta || "");
    var e = document.createElement("em");
    e.textContent = entry.tag;
    div.appendChild(b);
    div.appendChild(s);
    div.appendChild(e);
    return div;
  }

  /* ---------- scoring ---------- */

  function computeScore() {
    var sc = state.scenario;
    var map = itemIndex(sc);
    var ids = flaggedIds();

    var evTotal = 0, evGot = 0, supportCount = 0, falseAcc = 0, unverified = 0;

    Object.keys(map).forEach(function (id) {
      var it = map[id];
      if (it.kind === "evidence") { evTotal += 1; if (state.flagged[id] && !state.struck[id]) evGot += 1; }
    });
    ids.forEach(function (id) {
      var it = map[id];
      if (!it) return;
      if (it.kind === "support") {
        if (it.needs && !state.flagged[it.needs]) unverified += 1;
        else supportCount += 1;
      } else if (it.kind === "trap" || it.kind === "rights") {
        falseAcc += 1;
      }
    });

    var struckCount = Object.keys(state.struck).length;
    var correctSet = sc.correctVerdict.indexOf(state.verdict) !== -1;
    var banLost = state.verdict === "ban" && evGot === 0;
    var verdictOk = correctSet && !banLost;
    var verdictPts = verdictOk ? 40 : 0;
    var evPts = Math.min(24, evGot * 8);
    var supPts = Math.min(8, supportCount * 4);
    var thoroughPts = Math.min(12, Object.keys(state.inspected).length * 2);

    var testList = testsForMode();
    var doneTests = testList.filter(function (t) { return state.tests[t.key] && state.tests[t.key].state === "done"; }).length;
    var protoPts = testList.length ? Math.round(12 * doneTests / testList.length) : 0;

    var qs = window.QUIZ[sc.id] || [];
    var correct = 0;
    (state.quiz || []).forEach(function (pick, i) { if (qs[i] && qs[i].a === pick) correct += 1; });
    var quizPts = correct * 4;

    var apQs = (window.APPEAL && window.APPEAL[sc.id]) || [];
    var apRight = 0;
    (state.appeal || []).forEach(function (pick, i) { if (apQs[i] && pick === apQs[i].a) apRight += 1; });
    var appealPts = apRight * 6 - Math.max(0, apQs.length - apRight) * 8;

    var conductPts = -Math.min(15, state.conductMiss * 5);
    var falsePts = -(falseAcc * 15);
    var rightsPts = -(state.rights * 20);
    var unverPts = -(unverified * 10);
    var recDone = state.tests.rec && state.tests.rec.state === "done";
    var recPts = recDone ? 0 : -10;

    var total = verdictPts + evPts + supPts + thoroughPts + protoPts + quizPts + appealPts +
      conductPts + falsePts + rightsPts + unverPts + recPts;
    if (!verdictOk) total = Math.min(total, 45);
    if (state.rights > 0) total = Math.min(total, 49);
    total = Math.max(0, Math.min(100, total));

    var grade;
    if (state.rights > 0) grade = "BREACH";
    else if (!verdictOk) grade = "OVERTURNED";
    else if (total >= 80) grade = "EXEMPLARY";
    else if (total >= 70) grade = "CASE CLOSED";
    else grade = "WEAK FILE";

    return {
      verdictOk: verdictOk,
      banLost: banLost,
      struckCount: struckCount,
      evGot: evGot, evTotal: evTotal,
      correct: correct, quizTotal: qs.length,
      apRight: apRight, apTotal: apQs.length,
      testsDone: doneTests, testsTotal: testList.length,
      rows: [
        { label: "Verdict correct", out: verdictOk ? "+40" : "+0", pts: verdictPts, good: verdictOk },
        { label: "Evidence cited", out: "+" + evPts + " (" + evGot + "/" + evTotal + ")" + (struckCount ? " · " + struckCount + " struck" : ""), pts: evPts, good: evTotal > 0 && evGot === evTotal },
        { label: "Corroborating items", out: "+" + supPts, pts: supPts, good: supPts > 0 },
        { label: "Protocol tests run", out: "+" + protoPts + " (" + doneTests + "/" + testList.length + ")", pts: protoPts, good: doneTests === testList.length },
        { label: "Field test", out: "+" + quizPts + " (" + correct + "/" + qs.length + ")", pts: quizPts, good: correct === qs.length },
        { label: "Appeal held", out: (appealPts >= 0 ? "+" : "") + appealPts + " (" + apRight + "/" + apQs.length + ")", pts: appealPts, good: apRight === apQs.length },
        { label: "Thoroughness (items inspected)", out: "+" + thoroughPts, pts: thoroughPts, good: thoroughPts >= 10 },
        { label: "Suspect handling", out: conductPts === 0 ? "0" : String(conductPts), pts: conductPts, good: state.conductMiss === 0 },
        { label: "False accusations", out: falsePts === 0 ? "0" : String(falsePts), pts: falsePts, good: falseAcc === 0 },
        { label: "Rights violations", out: rightsPts === 0 ? "0" : String(rightsPts), pts: rightsPts, good: state.rights === 0 },
        { label: "Unverified detections cited", out: unverPts === 0 ? "0" : String(unverPts), pts: unverPts, good: unverified === 0 },
        { label: "Session recorded", out: recPts === 0 ? "0" : String(recPts), pts: recPts, good: recDone }
      ],
      total: total,
      grade: grade
    };
  }

  function renderResults() {
    var sc = state.scenario;
    var r = computeScore();
    stopClock();

    var expected = sc.correctVerdict
      .map(function (v) { return v === "ban" ? "BAN" : v === "clean" ? "CLEAN" : "INSUFFICIENT"; })
      .join(" or ");
    var chosen = state.verdict === "ban" ? "BAN" : state.verdict === "clean" ? "CLEAN" : "INSUFFICIENT";

    var gradeEl = $("results-grade");
    gradeEl.textContent = r.grade;
    gradeEl.className = "grade " + (
      r.grade === "EXEMPLARY" || r.grade === "CASE CLOSED" ? "grade-good" :
      r.grade === "WEAK FILE" ? "grade-warn" : "grade-bad");

    $("results-score").textContent = r.total + "/100";
    $("results-verdict").innerHTML =
      "You filed: <b>" + chosen + "</b> · Correct: <b>" + expected + "</b>" +
      (r.verdictOk ? ' <span class="ok">✓</span>' : ' <span class="no">✗</span>') +
      " · Mode: <b>" + modeMeta(state.mode).tag + "</b>" +
      (r.struckCount ? ' · <span class="no">' + r.struckCount + " citation" + (r.struckCount > 1 ? "s" : "") + " struck at appeal</span>" : "");

    var bd = $("breakdown");
    bd.innerHTML = "";
    r.rows.forEach(function (row) {
      var li = document.createElement("li");
      li.className = row.good ? "good" : (row.pts < 0 ? "bad" : "");
      li.innerHTML = "<span>" + row.label + "</span><b>" + row.out + "</b>";
      bd.appendChild(li);
    });

    var note = $("results-note");
    if (state.rights > 0) {
      note.textContent =
        "PROCEDURAL BREACH: you opened material covered by the player's rights. " +
        "In a real review this session gets thrown out — and the punishment with it — " +
        "regardless of what you found.";
      note.className = "results-note bad";
    } else if (r.banLost) {
      note.textContent =
        "APPEAL LOST: every citation your ban rested on was struck. A ban with nothing standing is " +
        "overturned — defend each artifact when the panel asks, or file INSUFFICIENT and re-run it.";
      note.className = "results-note bad";
    } else if (!r.verdictOk) {
      note.textContent = "Verdict overturned: " + sc.verdictNote;
      note.className = "results-note bad";
    } else {
      note.textContent = sc.verdictNote;
      note.className = "results-note good";
    }

    /* after-action: the evidence your report never touched */
    var rv = buildReview(sc);
    $("review-missed").innerHTML = "";
    $("review-held").innerHTML = "";
    rv.missed.forEach(function (e) { $("review-missed").appendChild(reviewLine(e)); });
    rv.held.forEach(function (e) { $("review-held").appendChild(reviewLine(e)); });
    $("review-missed-wrap").hidden = rv.missed.length === 0;
    $("review-held-wrap").hidden = rv.held.length === 0;
    $("review").hidden = rv.missed.length === 0 && rv.held.length === 0;

    /* field test review */
    var qr = $("quiz-review");
    var qs = window.QUIZ[sc.id] || [];
    qr.innerHTML = "";
    if (state.quiz && qs.length) {
      qr.hidden = false;
      var h = document.createElement("h5");
      h.textContent = "Field test — " + r.correct + "/" + qs.length;
      qr.appendChild(h);
      qs.forEach(function (q, i) {
        var pick = state.quiz[i];
        var ok = pick === q.a;
        var item = document.createElement("div");
        item.className = "qr-item";
        var qq = document.createElement("div");
        qq.className = "qr-q";
        qq.textContent = q.q;
        var ans = document.createElement("div");
        ans.className = "qr-a";
        ans.innerHTML = "you: <b class=\"" + (ok ? "yes" : "no") + "\">" + q.opts[pick] + "</b>";
        if (!ok) {
          var corr = document.createElement("span");
          corr.innerHTML = " · correct: <b class=\"yes\">" + q.opts[q.a] + "</b>";
          ans.appendChild(corr);
        }
        var why = document.createElement("div");
        why.className = "qr-why";
        why.textContent = q.why;
        item.appendChild(qq);
        item.appendChild(ans);
        item.appendChild(why);
        qr.appendChild(item);
      });
    } else {
      qr.hidden = true;
    }

    var db = $("debrief");
    db.innerHTML = "";
    var h4 = document.createElement("h4");
    h4.textContent = sc.debrief.verdict;
    db.appendChild(h4);
    var p = document.createElement("p");
    p.className = "debrief-summary";
    p.textContent = sc.debrief.summary;
    db.appendChild(p);
    sc.debrief.points.forEach(function (pt) {
      var div = document.createElement("div");
      div.className = "debrief-point";
      div.innerHTML = "<b>" + pt.h + "</b><span>" + pt.b + "</span>";
      db.appendChild(div);
    });

    saveScore(sc, r.total, r.grade);
    $("results").hidden = false;
  }

  function backToSelect() {
    $("results").hidden = true;
    $("quiz-modal").hidden = true;
    $("appeal-modal").hidden = true;
    $("verdict-modal").hidden = true;
    $("briefing").hidden = true;
    $("case-view").hidden = true;
    $("case-select").hidden = false;
    scanTimers.forEach(clearTimeout);
    scanTimers = [];
    stopClock();
    renderModes();
    renderModeBadge();
    renderSelect();
  }

  function replay() {
    $("results").hidden = true;
    $("quiz-modal").hidden = true;
    $("appeal-modal").hidden = true;
    beginCase(state.scenario);
  }

  /* ---------- wiring ---------- */

  function init() {
    if (!$("case-grid")) return; // not on practice.html

    renderModes();
    renderModeBadge();
    renderSelect();

    $("btn-begin").addEventListener("click", function () {
      var id = $("briefing").dataset.scen;
      var sc = (window.SCENARIOS || []).filter(function (s) { return s.id === id; })[0];
      if (!sc) return;
      $("briefing").hidden = true;
      beginCase(sc);
    });
    $("brief-cancel").addEventListener("click", function () { $("briefing").hidden = true; });

    $("btn-close").addEventListener("click", closeModal);
    $("btn-flag").addEventListener("click", toggleFlag);
    $("btn-rights-back").addEventListener("click", function () {
      applyRightsDecision("close");
      resolveActive(true);
    });
    $("btn-rights-proceed").addEventListener("click", function () {
      applyRightsDecision("proceed");
      resolveActive(true);
    });
    $("btn-abandon").addEventListener("click", backToSelect);
    $("btn-verdict").addEventListener("click", openVerdict);
    $("verdict-cancel").addEventListener("click", function () { $("verdict-modal").hidden = true; });
    $("btn-submit-verdict").addEventListener("click", submitVerdict);
    $("btn-submit-quiz").addEventListener("click", submitQuiz);
    $("btn-submit-appeal").addEventListener("click", submitAppeal);
    $("btn-replay").addEventListener("click", replay);
    $("btn-cases").addEventListener("click", backToSelect);

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!$("modal").hidden) { closeModal(); resolveActive(true); return; }
      if (!$("appeal-modal").hidden) {
        /* hand the player back to the field test — answers stay put */
        $("appeal-modal").hidden = true;
        $("quiz-modal").hidden = false;
        return;
      }
      if (!$("quiz-modal").hidden) {
        /* the field test is mandatory — hand the player back to the report */
        $("quiz-modal").hidden = true;
        $("verdict-modal").hidden = false;
        return;
      }
      if (!$("verdict-modal").hidden) $("verdict-modal").hidden = true;
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
