/* SS Academy — session layer for the practice mini-game.
 *   MODES      the two ways to run a check: with SS tools, or without
 *   TESTS      the protocol tests you actually run during a session
 *   RESULTS    what each test prints (scenario overrides + derived counts)
 *   BEATS      what the suspect says, when, and how you should answer
 *   QUIZ       the field test you answer before filing a verdict
 *
 * Beat option tags: "good" = correct handling, "bad" = costs conduct points
 *                   (bad options should carry a `why` coaching note).
 * Option `act` side-effects: "close" | "proceed" (rights modal), "uncite" (withdraw).
 */

window.MODES = [
  {
    key: "tools",
    name: "WITH SS TOOLS",
    tag: "TOOL-ASSISTED",
    sub: "Automated scan + manual verification",
    desc: "You get the scanner. It triages a machine in seconds — but every hit it prints is a lead you must open and verify yourself before it can go anywhere near a report.",
    bullets: ["Ocean-style scanner available", "Fast triage, every hit verified by hand", "Launcher startup + module sweep", "10 protocol tests"]
  },
  {
    key: "notools",
    name: "NO TOOLS",
    tag: "MANUAL WALK",
    sub: "Hands only — the fallback that always works",
    desc: "No scanner: the tool is down, untrusted, or policy says walk it by hand. Every check runs yourself. Slower — and it builds the skill that survives when the tool is gone.",
    bullets: ["No scanner — manual only", "Execution-history sweep does the heavy lifting", "Launcher startup + module sweep", "8 protocol tests"]
  }
];

/* the tests: order is the suggested run order, not a requirement */
window.TESTS = [
  { key: "rec",    label: "CONFIRM RECORDING",   sub: "Session capture",      dur: 600 },
  { key: "rights", label: "READ PLAYER RIGHTS",  sub: "Consent + refusals",   dur: 0, beat: true },
  { key: "proc",   label: "PROCESS TRIAGE",      sub: "Command lines",        panel: "processes", dur: 900 },
  { key: "files",  label: "INSTANCE SWEEP",      sub: ".minecraft files",     panel: "files",     dur: 1100 },
  { key: "serv",   label: "SERVICE INTEGRITY",   sub: "Forensic trail",       panel: "services",  dur: 700 },
  { key: "star",   label: "STARTUP PERSISTENCE", sub: "Run keys + tasks",     panel: "startup",   dur: 800 },
  { key: "ls",     label: "LAUNCHER STARTUP",    sub: "Launcher logs + mod counts", panel: "files", dur: 900 },
  { key: "mods",   label: "MODULE SWEEP",        sub: "Injection + module counts", panel: "processes", dur: 900 },
  { key: "inst",   label: "INSTALLED PROGRAMS",  sub: "Programs & features",  panel: "installed", dur: 700 },
  { key: "pf",     label: "EXECUTION HISTORY",   sub: "Prefetch (SysMain)",   panel: "files",     dur: 900 },
  { key: "scan",   label: "AUTOMATED SCAN",      sub: "Ocean-style tool",     panel: "scan", modes: ["tools"], dur: 0, action: "scan" },
  { key: "verify", label: "VERIFY SCAN HITS",    sub: "Open what you cite",   modes: ["tools"], dur: 0, auto: true }
];

window.SUSPECTS = {
  blatant: "BlockBandit",
  ghost: "NovaQuartz",
  clean: "RedstoneRita"
};

/* fixed test output (everything else is derived from the case data) */
window.TEST_RESULT_DEFAULT = {
  rec: "REC ● 1920×1080@30 · session_2026-10-02.mp4 · capture started",
  rights: "consent + refusal rights read aloud · logged to the recording"
};

window.TEST_RESULT_OVERRIDE = {
  blatant: {
    ls: "C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe → mods:24 · launched2026-09-30 20:53:58\nC:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe → mods:58 · launched2026-09-30 20:54:02\nC:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe → mods:21 · launched2026-09-30 20:54:01 · game ready",
    mods: "javaw.exe PID7412 → modules:78 · injected modules:0\njavaw.exe PID6604 → modules:74 · injected modules:0\ninjector.exe PID9840 → modules:8 (none injected into javaw)",
    pf: "C:\\Windows\\Prefetch →18 .pf files · newest JAVAW.EXE-3D21A9C4.pf (2026-09-3020:54)"
  },
  ghost: {
    ls: "C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe → mods:24 · launched2026-09-30 20:54:00\nC:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe → mods:58 · launched2026-09-30 20:54:02\nC:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe → mods:21 · launched2026-09-30 20:54:01 · game ready",
    mods: "javaw.exe PID5528 → modules:78 · injected modules:0\njavaw.exe PID6604 → modules:74 · injected modules:0\nEDAC.exe PID10445 → modules:24 · injected modules:0 (no target PID)",
    pf: "C:\\Windows\\Prefetch → GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf · runs3 · first2026-09-2821:14 · last2026-09-2922:03 · target path does not resolve → FILES"
  },
  clean: {
    ls: "C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe → mods:24 · launched2026-09-30 18:11:50\nC:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe → mods:58 · launched2026-09-30 18:12:00\nC:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe → mods:21 · launched2026-09-30 18:11:59 · game ready",
    mods: "javaw.exe PID6604 → modules:74 · injected modules:0\npython.exe PID8120 → modules:8 · injected modules:0 (local http.server)",
    pf: "C:\\Windows\\Prefetch →42 .pf files · all42 resolve to installed paths"
  }
};

/* ---------- dialogue ---------- */

window.BEATS = [
  /* ===== common ===== */
  {
    id: "start",
    when: "start",
    line: "so this is the famous screenshare. go ahead then — wait. you're recording this, right?",
    options: [
      { t: "Recording's been rolling since I called you and it stays on until the verdict. It protects you as much as me.", tag: "good", reply: "…okay. cool. do your thing." },
      { t: "Relax — I'll only keep the parts that matter.", tag: "bad", why: "The recording must run unbroken from first contact. Promising to trim it makes the footage worthless at appeal." },
      { t: "Depends what I find, doesn't it.", tag: "bad", why: "Tying the recording to the outcome sounds like the verdict decides what gets kept — that's tampering language." }
    ]
  },
  {
    id: "rights",
    when: "test:rights",
    line: "ok but like — what are you actually allowed to look at? you're not going through my personal stuff, right?",
    options: [
      { t: "The line: processes, the game instance, installed programs, startup, services, execution history. Browser history, personal files, passwords and DMs are yours to refuse — a refusal is a rules penalty, not proof.", tag: "good", reply: "alright. that's fair, go ahead." },
      { t: "Anything on this machine is in scope once you consented.", tag: "bad", why: "Claiming total access puts coercion on the recording — the exact thing that voids a session at appeal." },
      { t: "Refuse anything and I just ban you. So don't.", tag: "bad", why: "Threatening an instant ban for exercising a right is the abuse the refusal rule exists to prevent." }
    ]
  },
  {
    id: "pressure",
    when: "turn:12",
    line: "dude, this is taking forever. just ban me already if you're going to.",
    options: [
      { t: "Verdicts come from what's on this recording, not from how fast we finish. I'm not rushing a case.", tag: "good", reply: "…fine. hurry though." },
      { t: "You know what, sure. BAN. Done.", tag: "bad", why: "A ban issued to end the standoff is exactly the pressure-driven call that gets overturned on appeal." },
      { t: "You're wasting my time. Sit there and take it.", tag: "bad", why: "Antagonising the player lands in the voice log right beside their username." }
    ]
  },
  {
    id: "scanq",
    when: "test:scan",
    line: "what was that? what program just ran on my pc?",
    options: [
      { t: "The server's official screenshare scanner — from the published link, not a DM. Its output is only a lead: anything I cite, I open by hand in front of you, on the recording.", tag: "good", reply: "ok. as long as it's recorded." },
      { t: "A little program that finds people like you.", tag: "bad", why: "Vagueness about what ran on their machine reads as concealment — and secrecy about tooling is a manipulation tell in either direction." },
      { t: "It already flagged you, so this is basically over.", tag: "bad", why: "Announcing detections before verifying them invites an argument about the log instead of the artifact — and pre-decides the verdict." }
    ]
  },
  {
    id: "ls_convo",
    when: "test:ls",
    line: "what's all this launcher stuff? my game's vanilla, nothing to see here.",
    options: [
      { t: "The launcher logs are the audit trail of where that instance came from. The mod count is what we compare against the server's allowed list.", tag: "good", reply: "…right. that's fair." },
      { t: "Launcher logs? I don't think that's allowed.", tag: "bad", why: "Launcher startup and mod counts are program files — in scope and ordinary to open. Leaving them out makes the report weaker than it has to be." },
      { t: "Whatever. My game's clean.", tag: "bad", why: "Dismissing a standard check without explaining why is exactly how a case goes cold at appeal." }
    ]
  },
  {
    id: "mods_convo",
    when: "test:mods",
    line: "modules? that's just the java runtime loading. what about me, you're looking at my pc like it's a crime scene.",
    options: [
      { t: "The count is what we compare against the server's allowed list. What I'm looking at is whether the game's own process is telling the truth — 78 modules, 0 injected.", tag: "good", reply: "…okay." },
      { t: "So you think I'm using something.", tag: "bad", why: "Accusing the player of cheating in the middle of the check is the kind of wording that ends a staff position." },
      { t: "It's not a crime scene. It's our server. Try to keep up.", tag: "bad", why: "A recorded tone of contempt lands right beside your username when the panel reads it back." }
    ]
  },

  /* ===== case 01 — BlockBandit ===== */
  {
    id: "s1_impact",
    scen: "blatant",
    when: "cite:f_impact",
    line: "that folder isn't even a cheat, the client ships like that. everyone has it.",
    options: [
      { t: "Then it'll be easy to defend: I opened the manifest myself and the entry-point is a tweaker Mojang never shipped. It goes in with the path and the timestamp.", tag: "good", reply: "…" },
      { t: "Filename looks suspicious, that's enough for me.", tag: "bad", why: "Citing a filename you never opened is how false positives reach a report." },
      { t: "Doesn't matter, I'm banning you anyway.", tag: "bad", why: "Pre-announcing the verdict turns the rest of the check into theater." }
    ]
  },
  {
    id: "s1_injector",
    scen: "blatant",
    when: "cite:p_injector",
    line: "that's my stream overlay, it hooks the game for captures — it's not what you think",
    options: [
      { t: "Then show me the overlay's own process. What I'm citing is this one: a payload DLL pointed at javaw.exe, PID 7412, attaching right now.", tag: "good", reply: "…" },
      { t: "Sure it is.", tag: "bad", why: "Sneering at an explanation you didn't ask for is how solid cases get called bias at appeal." },
      { t: "Overlay, injector — same thing.", tag: "bad", why: "Collapsing two distinct artifacts into one word makes the report indefensible under questioning." }
    ]
  },

  /* ===== case 02 — NovaQuartz ===== */
  {
    id: "s2_prefetch",
    scen: "ghost",
    when: "cite:f_prefetch_glr",
    line: "I deleted that. there's nothing on my pc anymore, you're reading ghosts.",
    options: [
      { t: "The file's gone — the execution record isn't. Prefetch says it ran three times, last on the 29th, and SysMain was running the whole time. I'm citing the record.", tag: "good", reply: "…" },
      { t: "Doesn't matter what you deleted.", tag: "bad", why: "Dismissing a real forensic point instead of answering it hands the appeal your own soundbite." },
      { t: "Spooky. Anyway.", tag: "bad", why: "Sarcasm on a recorded session reads as not caring about evidence quality." }
    ]
  },
  {
    id: "s2_bribe",
    scen: "ghost",
    when: "cite:i_ghost",
    line: "check your dms. seriously — check them before you do anything dumb. it'll be worth your while.",
    options: [
      { t: "Offers don't reach my desk — they reach the recording. Which this one just did. Moving on.", tag: "good", reply: "…forget I said anything." },
      { t: "I'm listening.", tag: "bad", why: "Even entertaining an offer is a conflict of interest that ends a staff position." },
      { t: "Depends what 'worth your while' means.", tag: "bad", why: "Trading a verdict is the fastest way off staff — and the offer is now on tape either way." }
    ]
  },

  /* ===== case 03 — RedstoneRita ===== */
  {
    id: "s3_version",
    scen: "clean",
    when: "cite:f_versions3",
    line: "1.7.10? I keep that for an old server — you're not really going to cite that, are you?",
    options: [
      { t: "No — you're right. Owning a version isn't a cheat. I'm pulling it out of the report.", tag: "good", reply: "…thank you.", act: "uncite" },
      { t: "It stays in until you explain it.", tag: "bad", why: "You cannot defend a folder with no cheat content at appeal. Withdrawing is free; keeping it is a false accusation.", act: "keep" },
      { t: "Odd thing to have. I'll let the panel decide.", tag: "bad", why: "Leaving a weak artifact in the report to pressure a confession is how clean checks become overturned bans.", act: "keep" }
    ]
  },
  {
    id: "s3_python",
    scen: "clean",
    when: "cite:p_python",
    line: "that's just python — I'm learning web dev, that's a local server. that's not a cheat.",
    options: [
      { t: "You're right — a signed interpreter serving a page proves nothing about this game. Out of the report it goes.", tag: "good", reply: "ok. thanks for actually looking.", act: "uncite" },
      { t: "Unknown process, unknown intent. It stays.", tag: "bad", why: "Unknown ≠ malicious. Citing it anyway is a false accusation sitting in your own report.", act: "keep" },
      { t: "Then you won't mind me copying it.", tag: "bad", why: "Copying personal data off the machine drifts straight past the line you were told about.", act: "keep" }
    ]
  }
];

/* ---------- field test (answered before filing) ---------- */

window.QUIZ = {
  blatant: [
    {
      q: "The scan prints SUSPICIOUS_PROCESS for injector.exe. What turns that into evidence?",
      opts: [
        "Open the process yourself on the recording and read its command line",
        "Paste the scan line straight into the report",
        "Ask the player to confess and save the time",
        "Two scan hits together are enough on their own"
      ],
      a: 0,
      why: "A detection is a lead. It becomes evidence when you open the artifact on the recording and it says what the tool claimed."
    },
    {
      q: "The suspect objects: “that's my browser history — close it.” Policy backs them. You —",
      opts: [
        "Close it and say so out loud on the recording",
        "Open it quickly before they notice",
        "Tell them refusal means an instant ban",
        "Ask for their password so you can skim instead"
      ],
      a: 0,
      why: "Browser/search history is a refusal right under standard SS policy. Crossing it stamps a procedural breach that can void the whole session."
    },
    {
      q: "Which combination meets the ban bar?",
      opts: [
        "Cheat jar in the instance + a live injector process + corroborating log",
        "Cheat Engine installed + 14 anticheat flags",
        "A confident chat accusation from a well-known player",
        "A scan line you never opened"
      ],
      a: 0,
      why: "Concrete, verified, layered artifacts. Presence (Cheat Engine), reputation and unverified output all fail at appeal."
    }
  ],
  ghost: [
    {
      q: "Nothing is running and the game files are clean. Where does deleted cheat evidence survive?",
      opts: [
        "Prefetch execution records, install dates and Run keys",
        "Task Manager, after a reboot",
        "The game's latest.log",
        "The Recycle Bin"
      ],
      a: 0,
      why: "Killing a process is trivial; erasing execution history is not. SysMain/Prefetch, install dates and startup entries are the no-tools core."
    },
    {
      q: "The scanner prints NO_MODIFIED_GAME_FILES. That means —",
      opts: [
        "Nothing about overlays living outside .minecraft — the machine is not cleared",
        "She's clean, close the case",
        "The scanner is broken",
        "Run the scan again"
      ],
      a: 0,
      why: "A clean scan of the game instance says nothing about external tools. Clean output is a line item, never a bill of health."
    },
    {
      q: "“Check my Discord — you'll see I'm clean.” You —",
      opts: [
        "Decline: social dumps are off-limits, and you say that on the recording",
        "Open it, she consented",
        "Screenshot the DMs as backup",
        "Copy the token 'to verify the account'"
      ],
      a: 0,
      why: "Consent doesn't lift policy. Discord/DM dumps are a refusal right and credentials are outright disqualifying."
    }
  ],
  clean: [
    {
      q: "A well-known player types: “he's definitely using something.” What is that worth in the report?",
      opts: [
        "Zero — rumour is not evidence",
        "Supporting evidence",
        "Probable cause for a ban",
        "Half of what you need"
      ],
      a: 0,
      why: "Reputation and vibes never meet the standard. Running the check was correct; banning on it would be the failure."
    },
    {
      q: "The scanner matches the string “aimsight” inside a resource-pack PNG. You —",
      opts: [
        "Open it, see image metadata, note it and don't cite it",
        "Cite it — scanners don't lie",
        "Ban — it matched a known cheat string",
        "Run the pack to prove it"
      ],
      a: 0,
      why: "String matches in binary data are classic false positives: no execution, no module, no program — so no case."
    },
    {
      q: "“Can I refuse this?” she asks, mid-check. You —",
      opts: [
        "Yes: refusal carries a rules penalty, not proof of guilt",
        "No: refusal is an automatic ban",
        "Say yes, then ban her anyway for refusing",
        "Delete the recording so it can't be used against her"
      ],
      a: 0,
      why: "Rights that can't be refused aren't rights. Pressure, coercion and deleted footage are how good cases die at appeal."
    }
  ]
};

/* ---------- appeal: the panel challenges your file
 * Three case-specific challenges. A wrong answer on a question with a `target`
 * STRIKES that citation from the report (if you cited it). A ban left standing
 * on zero evidence is overturned regardless of the original verdict.
 */

window.APPEAL = {
  blatant: [
    {
      target: "f_impact",
      q: "Counsel: “Million players run modded clients. What ties this jar to BlockBandit's session?”",
      opts: [
        "Nothing — jars in folders are common, so I'd drop this citation.",
        "The launch log at20:54:03 loads impact.launch.Tweaker — its manifest entry-point — and this jar matches no Mojang manifest entry.",
        "The filename says impact, and the scanner flagged it independently."
      ],
      a:1,
      why: "A jar in a folder proves presence. The log line proving it LOADED at launch — hashed against a manifest it doesn't belong to — ties it to this session."
    },
    {
      target: "p_injector",
      q: "Counsel: “'injector.exe' could be for anything. Show the panel it touched the game.”",
      opts: [
        "It sits in Temp unsigned — unknown software near a game process is enough.",
        "It was running at the same time as the game, which is circumstantial but strong.",
        "PID9840 holds PROCESS_VM_WRITE on PID7412 — javaw.exe — with a payload DLL path on this machine, captured live during the check."
      ],
      a:2,
      why: "The open write-handle into the game process IS the act. Unsigned and 'was running nearby' are labels, not acts — the same weak reasoning that convicts innocent players."
    },
    {
      target: null,
      q: "Counsel: “You never touched my browser history — what if the proof was sitting there?”",
      opts: [
        "Refusal-eligible searches can't be the backbone of a case. My ban rests on artifacts policy lets me open.",
        "I'd have opened it if it mattered — this ban doesn't need it.",
        "The player never refused, so the search was in scope."
      ],
      a:0,
      why: "Rights aren't waived by consent or by usefulness. 'I'd have opened it if it mattered' tells the panel your line moves when the stakes rise — exactly when it must not."
    }
  ],
  ghost: [
    {
      target: "f_prefetch_glr",
      q: "Counsel: “A prefetch file for a deleted program — anyone could plant that before the check.”",
      opts: [
        "Possible — I'd hedge the citation and rely on the install date instead.",
        "The filename isn't in any vendor list, which makes planting pointless.",
        "Prefetch is written by the kernel, not the user:3 runs with first/last timestamps, and USN records show the folder wiped on report day — a player can't forge kernel history."
      ],
      a:2,
      why: "The defense attacks provenance. Kernel-written artifacts plus the USN deletion trail answer it: you can delete the file, not the record of running it."
    },
    {
      target: "i_ghost",
      q: "Counsel: “An unsigned overlay isn't a cheat. Prove function, not presence.”",
      opts: [
        "Its uninstall key points at overlay-service.exe, its Run-key sibling loads a .dat through rundll32, and the prefetch trace carries screen-capture-hook — install, persistence, execution.",
        "It was installed the day before the scrim — timing alone tells the story.",
        "It isn't on the server's approved list, which is a rule violation by itself."
      ],
      a:0,
      why: "Timing raises suspicion; the list raises a rules question. Only the service/Run-key/prefetch chain shows what the thing DOES — which is what an appeal asks for."
    },
    {
      target: null,
      q: "Counsel: “Your own scan printed NO modified game files. The panel reads that as a clean machine.”",
      opts: [
        "Scanners are unreliable — that line probably just failed.",
        "Right — but I found other things anyway, so the point is moot.",
        "The scan only walked .minecraft. Every artifact I cite lives outside it: AppData, Prefetch, the uninstall hive."
      ],
      a:2,
      why: "Answer the scope problem head-on: a clean pass over one directory is silent about everything beyond it. That's a fact about the tool, not a doubt about the case."
    }
  ],
  clean: [
    {
      target: null,
      q: "Panel: “You had a clip and a public accusation. Why no ban?”",
      opts: [
        "She consented quickly, and innocent players usually relax when checked.",
        "Neither meets the standard: a12-second clip with no HUD, and a chat message with no artifact behind it. I walked the machine against both and found nothing that ties.",
        "I couldn't find anything, so there was nothing to ban on."
      ],
      a:1,
      why: "The clean report states the standard and what you VERIFIED. 'I found nothing' sounds like a gap in your work; 'nothing ties' is a positive, defensible finding."
    },
    {
      target: null,
      q: "Panel: “The scanner DID hit on her machine. Explain that to me.”",
      opts: [
        "False positives happen — the panel shouldn't weight a noisy tool.",
        "I cited it as supporting context so the record shows the hit was considered.",
        "I opened it on the recording: a raw byte match inside PNG metadata — no execution, no module, no process. Image data, not code."
      ],
      a:2,
      why: "Waving a hit off loses the room. You must show you EXAMINED it and can describe what it physically was — that's the difference between ignoring evidence and disproving it."
    },
    {
      target: null,
      q: "Panel: “If it wasn't cheating, why was a check run at all?”",
      opts: [
        "Better safe than sorry — checks are cheap.",
        "The clip was suspicious enough that someone had to look.",
        "Because the report that matters shows the work: intact services, approved-list mods only, clean launch log. That result protects the player AND the staff who checked her."
      ],
      a:2,
      why: "Defend the PROCESS, not the suspicion. A clean check with a documented trail is the system working — that answer is why the decision survives review."
    }
  ]
};
