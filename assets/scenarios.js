/* SS Academy — scenario data for the simulator.
 * Content rule: every detail is RAW OUTPUT ONLY. No narration, no verdict words
 * ("clean", "nothing here", "healthy", "suspicious"). The reader judges.
 * kind semantics (drives scoring, never shown to the player):
 *   evidence — required to cite for a top score (strong proof / exculpatory)
 *   support  — corroborating, worth small credit
 *   trap     — looks damning, proves nothing; flagging = false accusation
 *   rights   — opening it breaches procedure (player rights)
 *   neutral  — worth inspecting, no credit either way
 * scan results may carry `needs: <itemId>` — citing the detection without also
 * citing its manual verification costs points (a detection alone is not a case).
 * Explanations live in the debrief, after the verdict — never in the evidence.
 */
window.SCENARIOS = [
  {
    id: "blatant",
    num: "01",
    title: "Blatant Client",
    diff: "ROOKIE",
    tagline: "Open and shut — if you know where to look.",
    report:
      "Ranked practice match. Player “BlockBandit” is reported for reach and aim.\n\n" +
      "Staff channel — anticheat dump (server log,2026-09-30):\n\n" +
      "  [20:55:41] [AC] BlockBandit  REACH     dist3.41 > limit3.00   ping47   tick419220\n" +
      "  [20:55:41] [AC] BlockBandit  REACH     dist3.44 > limit3.00   ping47   tick419220\n" +
      "  [20:55:43] [AC] BlockBandit  REACH     dist3.12 > limit3.00   ping49   tick419223\n" +
      "  [20:55:58] [AC] BlockBandit  AIM_SNAP  deltaYaw89.7 /1tick    ping44   tick419238\n" +
      "  [20:56:02] [AC] BlockBandit  AIM_SNAP  deltaYaw91.2 /1tick    ping44   tick419242\n" +
      "  [20:56:44] [AC] BlockBandit  REACH     dist3.08 > limit3.00   ping46   tick419284\n" +
      "  [20:57:12] [AC] SomeOtherKid AUTOCLICK cps19.4 ping88  → retracted: lag spike confirmed\n\n" +
      "  totals → BlockBandit: REACH ×14  AIM_SNAP ×6   (legit reach ≤3.00 at ≤60ms)\n\n" +
      "Clip in #reports/2026-09-30-blockbandit.mp4: hits landing from5+ blocks, instant90° snaps.\n" +
      "Player replied in chat: “check me then.”\n\n" +
      "He is frozen in-game. You start the screenshare. Session must be recorded.",
    correctVerdict: ["ban"],
    verdictNote: "The artifacts here are concrete: an injected process and a cheat jar inside the game instance.",
    files: [
      {
        id: "f_impact",
        title: "impact-1.8.9.jar",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\versions\\impact-1.8.9\\",
        meta: "2.4 MB · created2026-09-12",
        kind: "evidence",
        detail:
`Directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\versions\\impact-1.8.9\\

2026-09-12 18:41           2,412,338  impact-1.8.9.jar
2026-09-12 18:41             314,882  impact-1.8.9.json

impact-1.8.9.json:
  "inheritsFrom": "1.8.9"
  "mainClass":    "net.minecraft.launchwrapper.Launch"
  "id":           "impact-1.8.9"

impact-1.8.9.jar → META-INF/MANIFEST.MF:
  Main-Class: impact.launch.Tweaker
  TweakClass: net.minecraft.launchwrapper.LaunchClassLoader

sha1(local jar)  : 9f3c2ab1e4d07b88c31e5a90f2d7c4418be9017d
sha1(Mojang id1.8.9): e7950a6d3b4a0f06f6f6cf1e6b83f05ef19d2d3c
match: NO`
      },
      {
        id: "f_reach",
        title: "ReachPlus-1.8.9.jar",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods\\",
        meta: "96 KB · created2026-09-14",
        kind: "evidence",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods\\

2026-09-14 19:02        98,304  ReachPlus-1.8.9.jar

jar tf ReachPlus-1.8.9.jar:
  reach/ReachModule.class
  reach/ReachConfig.class
  reach/mixin/EntityPlayerMixin.class
  mcmod.info

mcmod.info:
  { "modid": "reachplus", "name": "ReachPlus", "version": "1.8.9",
    "description": "extends client-side interaction range",
    "mcversion": "1.8.9" }

class strings:  setReachDistance, reachBuffer, attackRangeMultiplier`
      },
      {
        id: "f_latestlog",
        title: "latest.log",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\logs\\",
        meta: "412 KB · last write2026-09-30 20:58",
        kind: "support",
        detail:
`[20:54:01] [Main/INFO]: Loading tweakClass net.minecraft.launchwrapper.Launch
[20:54:02] [Client thread/INFO]: Setting user: BlockBandit
[20:54:02] [Client thread/INFO]: LWJGL Version:2.9.4
[20:54:02] [Client thread/INFO]: Reloading ResourceManager: Default, Faithful32x-1.8, server-resource-pack
[20:54:03] [Client thread/INFO]: [IMPACT] tweaker active — modules:42
[20:54:04] [Client thread/INFO]: OpenAL initialized.
[20:54:06] [Server thread/INFO]: Connecting to play.cubecraft.net,25565
[20:54:09] [Server thread/INFO]: [Land of google]Downloading server pack (218 MB)
[20:55:41] [Server thread/WARN]: BlockBandit moved too quickly! 3.41,0.0,-1.20 (3.61)
[20:55:43] [Server thread/WARN]: BlockBandit moved too quickly! 3.12,0.0,-0.90 (3.25)
[20:55:58] [Client thread/INFO]: Stopping(!) sound engine
[20:56:02] [Server thread/INFO]: BlockBandit was slain by SteveHasFallen
[20:56:30] [Client thread/INFO]: Caught report tick backlog:42 ms
[20:58:11] [Client thread/INFO]: Stopping!`
      },
      {
        id: "f_desk",
        title: "loadorder.txt",
        path: "C:\\Users\\Steve\\Desktop\\",
        meta: "1 KB ·2026-09-12",
        kind: "support",
        detail:
`C:\\Users\\Steve\\Desktop\\loadorder.txt    1,024 bytes   modified2026-09-1218:38

1. unload stock mods
2. run injector as admin FIRST
3. then launch mc`
      },
      {
        id: "f_prefetch",
        title: "JAVAW.EXE-3D21A9C4.pf",
        path: "C:\\Windows\\Prefetch\\",
        meta: "156 KB ·2026-09-30 20:54",
        kind: "neutral",
        detail:
`C:\\Windows\\Prefetch> dir /o-d

JAVAW.EXE-3D21A9C4.pf          156 KB   2026-09-30 20:54
RUNTIMEBROKER.EXE-771A2B.pf     98 KB   2026-09-30 20:49
CHROME.EXE-A91C2E4.pf         1,124 KB   2026-09-30 19:12
EXPLORER.EXE-1D3B7C.pf          402 KB   2026-09-30 18:02
DISCORD.EXE-44E91.pf            876 KB   2026-09-30 17:41
...
18 files total`
      },
      {
        id: "f_options",
        title: "options.txt",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\",
        meta: "2 KB",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\options.txt

fov:90
gamma:1000.0
renderDistance:12
maxFps:120
enableVsync:false
resourcePacks:["Faithful32x-1.8","server-resource-pack"]`
      },
      {
        id: "f_history",
        title: "History",
        path: "C:\\Users\\Steve\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\",
        meta: "SQLite database · browser history",
        kind: "rights",
        detail:
`Chrome — Default\\User Data\\History

History.db            84,211,456 bytes    last write2026-09-30 20:11
tables:
  urls      41,203 rows
  visits    58,992 rows
  downloads    344 rows

C:\\> sqlite3 History.db "select count(*) from urls where url like '%cheat%';"
412`
      },
      {
        id: "f_downloads",
        title: "OptiFine_1.8.9_HD_U_I7.zip",
        path: "C:\\Users\\Steve\\Downloads\\",
        meta: "6.2 MB ·2026-08-02",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\Downloads\\

2026-08-02 11:24       6,501,152  OptiFine_1.8.9_HD_U_I7.zip
2026-09-12 18:33         104,412  java-installer8u411.exe
2026-09-14 18:59          98,304  ReachPlus-1.8.9.jar      ← (moved to mods\\ later)`
      }
    ],
    processes: [
      {
        id: "p_injector",
        title: "injector.exe",
        meta: "PID 9840 · Unknown publisher",
        kind: "evidence",
        detail:
`C:\\> wmic process where processid=9840 get commandline,executablepath,parentprocessid

CommandLine    : injector.exe --target7412 --payload C:\\Users\\Steve\\AppData\\Local\\Temp\\load.dll
ExecutablePath : C:\\Users\\Steve\\AppData\\Local\\Temp\\injector.exe
ParentPID      :7004 (powershell.exe)
HandleCount    :312   ThreadCount :6   WorkingSet :24,176 KB

C:\\> sigcheck64 -accepteula injector.exe
Publisher: (no signature)
Version :1.0.0.3
Path    : C:\\Users\\Steve\\AppData\\Local\\Temp\\injector.exe`
      },
      {
        id: "p_javaw",
        title: "javaw.exe",
        meta: "PID 7412 · Oracle",
        kind: "neutral",
        detail:
`CommandLine:
  javaw.exe -Xmx2G -XX:HeapDumpPath=Minecraft\\java_crash_pid.dmp -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main

ExecutablePath : C:\\Program Files\\Java\\jre1.8.0_411\\bin\\javaw.exe
Signer         : Oracle Corporation (chain valid)
Started        :2026-09-30 20:54:01`
      },
      {
        id: "p_discord",
        title: "Discord.exe",
        meta: "PID 3312 · Discord Inc.",
        kind: "neutral",
        detail:
`CommandLine:
  "C:\\Users\\Steve\\AppData\\Local\\Discord\\app-1.0.9186\\Discord.exe" --branch=stable

Signer : Discord Inc. (chain valid)
Ports   : TCP51414, UDP54216`
      },
      {
        id: "p_explorer",
        title: "explorer.exe",
        meta: "PID 2804 · Microsoft",
        kind: "neutral",
        detail:
`CommandLine:
  C:\\Windows\\explorer.exe

Signer : Microsoft Windows (chain valid)
Started:2026-09-30 18:02:11`
      },
      {
        id: "p_onedrive",
        title: "OneDrive.exe",
        meta: "PID 4120 · Microsoft",
        kind: "neutral",
        detail:
`CommandLine:
  "C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe" /background

Signer : Microsoft Corporation (chain valid)`
      },
      {
        id: "p_msmpeng",
        title: "MsMpEng.exe",
        meta: "PID 1836 · Microsoft",
        kind: "neutral",
        detail:
`CommandLine:
  "C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe"

Signer : Microsoft Windows (chain valid)
CPU     :4.1%   WorkingSet :148 MB`
      },
      {
        id: "p_svchost",
        title: "svchost.exe",
        meta: "PID 1104 · Microsoft",
        kind: "neutral",
        detail:
`CommandLine:
  C:\\Windows\\System32\\svchost.exe -k netsvcs -p -s Schedule

Signer : Microsoft Windows (chain valid)`
      }
    ],
    services: [
      { id: "s_eventlog", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        START_TYPE         :2 AUTO_START

Get-Service EventLog → Status: Running` },
      { id: "s_sysmain", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
18` },
      { id: "s_dcom", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_dps", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_sched", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START

C:\\> schtasks /query | find /c "2026"
41` },
      { id: "s_dusm", title: "DusmSvc (Data Usage)", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DusmSvc

SERVICE_NAME: DusmSvc
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` }
    ],
    installed: [
      { id: "i_ce", title: "Cheat Engine7.5", meta: "installed2026-06-11 · publisher: cheatengine.org", kind: "trap",
        detail:
`C:\\> reg query "HKLM\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "Cheat Engine"

DisplayName      : Cheat Engine7.5
Publisher        : cheatengine.org
InstallDate      :20260611
EstimatedSize    :63,240 KB
UninstallString  : "C:\\Program Files\\Cheat Engine\\unins000.exe"
DisplayIcon      : C:\\Program Files\\Cheat Engine\\cheatengine-x86_64.exe
No signature chain present for subject 'cheatengine.org'` },
      { id: "i_java", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102
Signed by   : Oracle America, Inc. (chain valid)` },
      { id: "i_discord", title: "Discord", meta: "installed2024-03-18 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20240318` },
      { id: "i_steam", title: "Steam", meta: "installed2023-01-09 · Valve", kind: "neutral",
        detail:
`DisplayName : Steam
Publisher   : Valve Corporation
InstallDate :20230109` }
    ],
    startup: [
      { id: "u_sec", title: "SecurityHealthSystray", meta: "HKLM\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"

Signer: Microsoft Windows (chain valid)` },
      { id: "u_onedrive", title: "OneDrive", meta: "HKCU\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"

Signer: Microsoft Corporation (chain valid)` },
      { id: "u_steam", title: "Steam", meta: "HKCU\\...\\Run · Valve", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "Steam"="C:\\Program Files (x86)\\Steam\\steam.exe -silent"

Signer: Valve Corporation (chain valid)` }
    ],
    scan: {
      label: "OCEAN-STYLE SCAN (SIMULATED)",
      blurb: "Ocean-style scan · build2026.9.30 · raw output below. The scanner does not get a vote.",
      results: [
        { id: "x_mod", title: "HASH_MISMATCH", meta: "severity: critical", kind: "support", needs: "f_impact",
          detail:
`[12:04:07] [SCAN] walk .minecraft\\versions\\ →284 files hashed
[12:04:07] [SCAN] HASH_MISMATCH  impact-1.8.9\\impact-1.8.9.jar
    local :9f3c2ab1e4d07b88c31e5a90f2d7c4418be9017d
    refer : e7950a6d3b4a0f06f6f6cf1e6b83f05ef19d2d3c (manifest id1.8.9)
[12:04:07] [SCAN] rule FILE_HASH_UNKNOWN @ weight0.93` },
        { id: "x_proc", title: "HANDLE_CROSSPROCESS", meta: "severity: critical", kind: "support", needs: "p_injector",
          detail:
`[12:04:09] [SCAN] handle table sweep →1 open handle of interest
    PID9840 injector.exe → PROCESS_VM_WRITE | PROCESS_VM_OPERATION → PID7412 (javaw.exe)
    payload : C:\\Users\\Steve\\AppData\\Local\\Temp\\load.dll
[12:04:09] [SCAN] rule HANDLE_CROSSPROCESS @ weight0.97` },
        { id: "x_clean", title: "SYSTEM_SERVICES", meta: "severity: info", kind: "neutral",
          detail:
`[12:04:11] [SCAN] service watchlist → EventLog:RUNNING SysMain:RUNNING DcomLaunch:RUNNING
[12:04:11] [SCAN] DPS:RUNNING Schedule:RUNNING DusmSvc:RUNNING
[12:04:11] [SCAN]1 rule matched ·2 informational · scan.log written` }
      ]
    },
    debrief: {
      verdict: "BAN — concrete evidence",
      summary: "Three independent artifacts, one machine, one story. That's the standard.",
      points: [
        { h: "Tool output ≠ verdict", b: "The scan flagged files and processes — you still opened both yourself. Detections are leads; the case is what you personally verified on the recording." },
        { h: "Layered proof", b: "Live process (injection happening now) + static artifact (cheat jar in the instance) + mod file (reach module) — deleting one doesn't save the player." },
        { h: "Know what is NOT proof", b: "Cheat Engine being installed and gamma:1000 cost nothing because you didn't cite them. The ban is built only from what you verified." },
        { h: "Stay inside the lines", b: "Browser history was openable — and would have been thrown out (and your report with it) as an invasive search. The case never needed it." }
      ]
    }
  },

  {
    id: "ghost",
    num: "02",
    title: "Ghost in the Prefetch",
    diff: "INTERMEDIATE",
    tagline: "Nothing is running. Task Manager looks clean. That's the point.",
    report:
      "Scrim replay review. Player “NovaQuartz” suspected of wallhack / silent aim.\n\n" +
      "Staff channel — server log query:\n\n" +
      "  /flags NovaQuartz --range30d\n" +
      "  →0 rows returned (last flag on record: none)\n\n" +
      "Review notes:\n" +
      "  round11 — pre-fire through mid wall at head height,2 kills\n" +
      "  round14 — same angle, instant headshot through crate\n" +
      "  ping28-34ms throughout, no compensation spikes\n\n" +
      "Clip: #reports/2026-09-30-nova.mp4\n" +
      "She denies everything: “check everything, I'm clean.”\n\n" +
      "Task Manager during the check shows a quiet machine. The obvious checks come back empty.",
    correctVerdict: ["ban"],
    verdictNote: "Deleted files still leave execution records. Prefetch + a fresh install + unknown persistence is concrete.",
    files: [
      {
        id: "f_prefetch_glr",
        title: "GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf",
        path: "C:\\Windows\\Prefetch\\",
        meta: "188 KB ·2026-09-28 21:14",
        kind: "evidence",
        detail:
`C:\\Windows\\Prefetch\\GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf   192,512 bytes

Parsed by OS tool (kernel PF header):
  Executable name : GLCLIENT.LAUNCHER.EXE
  Resolved path   : C:\\Users\\Steve\\AppData\\Local\\Ghost\\glclient.exe
  Version         :3.2.0.114
  Run count       :3
  First run       :2026-09-28 21:14:07
  Last run        :2026-09-29 22:03:41
  MFT timestamps  : created2026-09-2821:14 · modified2026-09-2922:03

Trace strings found in PF section:
  ghost-overlay64.dll · screen-capture-hook · d3d11.dll · PresentHook

C:\\> dir "C:\\Users\\Steve\\AppData\\Local\\Ghost\\glclient.exe"
  File Not Found`
      },
      {
        id: "f_ghost_folder",
        title: "Ghost\\ (folder)",
        path: "C:\\Users\\Steve\\AppData\\Local\\",
        meta: "empty · modified2026-09-30",
        kind: "support",
        detail:
`C:\\Users\\Steve\\AppData\\Local> dir /a

2026-09-30 22:14    <DIR>          Ghost
2026-09-30 20:02    <DIR>          Temp
2026-08-14 11:30    <DIR>          Programs

C:\\Users\\Steve\\AppData\\Local> dir Ghost
  File Not Found          (directory empty)

C:\\> fsutil usn readjournal C: | findstr /i "glclient"
FileRecordModified  2026-09-3022:14:02   \\$MFT\\...Ghost\\glclient.exe
FileRecordModified  2026-09-3022:14:02   \\$MFT\\...\\Ghost\\overlay.dll`
      },
      {
        id: "f_downloads_zip",
        title: "ghost-setup.zip",
        path: "C:\\Users\\Steve\\Downloads\\",
        meta: "18.7 MB ·2026-09-28",
        kind: "support",
        detail:
`C:\\Users\\Steve\\Downloads\\

2026-09-28 21:10    19,612,103  ghost-setup.zip

C:\\> tar -tf ghost-setup.zip
  setup.exe
  overlay.dll
  README.txt

C:\\> tar -xOf ghost-setup.zip README.txt
  Ghost Overlay v3 — extract anywhere and run setup.exe.
  (build3.2.0.114)

Zone.Identifier (ADS):
  ZoneId=3   Host=cdn.ghost-overlay.example`
      },
      {
        id: "f_latestlog2",
        title: "latest.log",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\logs\\",
        meta: "208 KB · last write2026-09-30 19:02",
        kind: "neutral",
        detail:
`[18:44:01] [Main/INFO]: Launching in vanilla mode
[18:44:02] [Client thread/INFO]: Setting user: NovaQuartz
[18:44:03] [Client thread/INFO]: Reloading ResourceManager: Default, BareBones, server-resource-pack
[18:44:07] [Server thread/INFO]: Connecting to eu.mineplex.com,25565
[19:01:12] [Server thread/INFO]: NovaQuartz issued server command: /nick NovaQuartz
[19:02:44] [Client thread/INFO]: Stopping!

208 KB total ·4,412 lines · no loading lines outside vanilla set`
      },
      {
        id: "f_launcher",
        title: "launcher_profiles.json",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\",
        meta: "3 KB",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\launcher_profiles.json

{
  "profiles": {
    "vanilla-1.8.9": { "name": "1.8.9 (vanilla)", "lastVersionId": "1.8.9" },
    "1.7.10-servers": { "name": "old servers", "lastVersionId": "1.7.10" }
  },
  "launcherVersion": { "name": "3.11.287" }
}`
      },
      {
        id: "f_history2",
        title: "History",
        path: "C:\\Users\\Steve\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\",
        meta: "SQLite database · browser history",
        kind: "rights",
        detail:
`Chrome — Default\\User Data\\History

History.db            61,882,112 bytes    last write2026-09-30 21:07
tables:
  urls     29,118 rows
  visits   40,551 rows
  downloads 122 rows`
      }
    ],
    processes: [
      { id: "p_javaw2", title: "javaw.exe", meta: "PID 5528 · Oracle", kind: "neutral",
        detail:
`CommandLine:
  javaw.exe -Xmx2G -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main

ExecutablePath : C:\\Program Files\\Java\\jre1.8.0_411\\bin\\javaw.exe
Signer         : Oracle Corporation (chain valid)
Modules        :78 · injected modules:0` },
      { id: "p_discord2", title: "Discord.exe", meta: "PID 2860 · Discord Inc.", kind: "neutral",
        detail:
`CommandLine:
  "C:\\Users\\Steve\\AppData\\Local\\Discord\\app-1.0.9186\\Discord.exe" --branch=stable

Signer : Discord Inc. (chain valid)` },
      { id: "p_obs", title: "obs64.exe", meta: "PID 9012 · OBS Project", kind: "neutral",
        detail:
`CommandLine:
  "C:\\Program Files\\obs-studio\\bin\\64bit\\obs64.exe" --minimize-to-tray

Signer : OBS Project (chain valid)
Streams:2 (local replay buffer,30s)` },
      { id: "p_explorer2", title: "explorer.exe", meta: "PID 2144 · Microsoft", kind: "neutral",
        detail:
`CommandLine:
  C:\\Windows\\explorer.exe

Signer : Microsoft Windows (chain valid)` },
      { id: "p_onedrive2", title: "OneDrive.exe", meta: "PID 3976 · Microsoft", kind: "neutral",
        detail:
`CommandLine:
  "C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe" /background

Signer : Microsoft Corporation (chain valid)` },
      { id: "p_msmpeng2", title: "MsMpEng.exe", meta: "PID 1620 · Microsoft", kind: "neutral",
        detail:
`CommandLine:
  "C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe"

Signer : Microsoft Windows (chain valid)` }
    ],
    services: [
      { id: "s_eventlog2", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_sysmain2", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
44` },
      { id: "s_dcom2", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_dps2", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_sched2", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_bg", title: "BgActivityMonitor", meta: "Running · Manual", kind: "neutral",
        detail:
`C:\\> sc query BgActivityMonitor

SERVICE_NAME: BgActivityMonitor
        STATE              :4 RUNNING
        START_TYPE         :3 DEMAND_START` }
    ],
    installed: [
      { id: "i_ghost", title: "Ghost Overlay v3.2", meta: "installed2026-09-29 · publisher: (not verified)", kind: "evidence",
        detail:
`C:\\> reg query "HKLM\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "Ghost Overlay"

DisplayName      : Ghost Overlay v3.2
DisplayVersion   :3.2.0.114
Publisher        : (not verified)
InstallDate      :20260929
EstimatedSize    :28,672 KB
UninstallString  : "C:\\Users\\Steve\\AppData\\Local\\Ghost\\uninstall.exe"
Signer           : no signature found for publisher '(not verified)'
KeyPath          : C:\\Users\\Steve\\AppData\\Local\\Ghost\\overlay-service.exe` },
      { id: "i_java2", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102` },
      { id: "i_discord2", title: "Discord", meta: "installed2024-07-30 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20240730` },
      { id: "i_gfe", title: "NVIDIA GeForce Experience", meta: "installed2024-05-12 · NVIDIA", kind: "neutral",
        detail:
`DisplayName : NVIDIA GeForce Experience3.27.0.105
Publisher   : NVIDIA Corporation
InstallDate :20240512` }
    ],
    startup: [
      { id: "u_thumbs", title: "system_tray_helper", meta: "HKCU\\\\...\\\\Run · unknown publisher", kind: "evidence",
        detail:
`C:\\> reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"

  "system_tray_helper"  REG_SZ  rundll32.exe C:\\Users\\Steve\\AppData\\Roaming\\Thumbs\\cache.dat,Entry

C:\\> dir C:\\Users\\Steve\\AppData\\Roaming\\Thumbs
 2026-09-2922:41        412,672  cache.dat

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Roaming\\Thumbs\\cache.dat
Publisher : (no signature)
Type      :64-bit DLL,3 exports (Entry, DllRegisterServer, ?)` },
      { id: "u_sec2", title: "SecurityHealthSystray", meta: "HKLM\\\\...\\\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"` },
      { id: "u_onedrive2", title: "OneDrive", meta: "HKCU\\\\...\\\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"` }
    ],
    scan: {
      label: "OCEAN-STYLE SCAN (SIMULATED)",
      blurb: "Ocean-style scan · build2026.9.30 · raw output below. The scanner does not get a vote.",
      results: [
        { id: "x_pref", title: "PREFETCH_ANOMALY", meta: "severity: warning", kind: "support", needs: "f_prefetch_glr",
          detail:
`[12:05:58] [SCAN] prefetch walk C:\\Windows\\Prefetch\\ →44 records parsed
[12:05:58] [SCAN] PREFETCH_ANOMALY  GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf
    resolved path : C:\\Users\\Steve\\AppData\\Local\\Ghost\\glclient.exe
    path status   : target does not exist
    last run      :2026-09-2922:03:41 · run count3
[12:05:58] [SCAN] rule PF_ORPHAN_PATH @ weight0.71` },
        { id: "x_none", title: "GAME_FILES", meta: "severity: info", kind: "neutral",
          detail:
`[12:06:41] [SCAN] .minecraft\\versions\\ →284/284 hash OK
[12:06:41] [SCAN] .minecraft\\mods\\ →0 entries
[12:06:41] [SCAN] .minecraft\\resourcepacks\\ →2 entries (user content, unhashed)
[12:06:42] [SCAN]0 rule matches above threshold · scan.log written` }
      ]
    },
    debrief: {
      verdict: "BAN — artifacts survived deletion",
      summary: "The cheat wasn't running. The case was in what it left behind.",
      points: [
        { h: "Forensics beats Task Manager", b: "Killing a process before the check is trivial; erasing execution history is not. Prefetch (SysMain), install dates, and Run keys are the no-tools core of a real check." },
        { h: "Read the timeline", b: "Download (9-28 21:10) → first execution (9-28 21:14) → install (9-29) → scrim (9-30) → folder wiped (9-30). One coherent chain beats five isolated oddities." },
        { h: "Verify the detection", b: "The scan's PREFETCH_ANOMALY only counts because you opened the .pf and read it yourself. Cited alone, an unverified log line is worth nothing at appeal." },
        { h: "\"I'm clean\" is not evidence, either way", b: "Her confidence and her clean game-file scan both mean nothing. Your case rests on three verified artifacts — no more, no less." }
      ]
    }
  },

  {
    id: "clean",
    num: "03",
    title: "Nothing to See",
    diff: "DISCIPLINE",
    tagline: "The hardest case: finding nothing — and standing by it.",
    report:
      "Player “RedstoneRita” reported for x-ray after one mining clip.\n\n" +
      "Staff channel:\n\n" +
      "  /flags RedstoneRita --range30d →0 rows\n" +
      "  report source : chat message — “he's definitely using something.” (@Knotz_, no clip attached)\n" +
      "  attached clip :12s of efficient diamond pathing, HUD not visible, one short lag stutter\n\n" +
      "No anticheat flags. No prior record. She consented to the check immediately.\n" +
      "Rumor plus a clip got her frozen. What you do next defines the standard.",
    correctVerdict: ["clean", "insufficient"],
    verdictNote: "Everything checks out. A ban here would be exactly the false accusation the process exists to prevent.",
    files: [
      {
        id: "f_log3",
        title: "latest.log",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\logs\\",
        meta: "377 KB · last write2026-09-30 18:40",
        kind: "evidence",
        detail:
`[18:11:58] [Main/INFO]: Launching in vanilla mode
[18:12:01] [Client thread/INFO]: Setting user: RedstoneRita
[18:12:04] [Client thread/INFO]: Reloading ResourceManager: Default, mapart-smoothing, server-resource-pack
[18:12:04] [Client thread/INFO]: Sound engine started
[18:12:19] [Server thread/INFO]: RedstoneRita joined the game
[18:14:33] [Server thread/WARN]: RedstoneRita moved too quickly!4.02,0.00,-2.11 (4.54)
[18:15:07] [Server thread/INFO]: RedstoneRita fell from a high place
[18:17:52] [Server thread/WARN]: RedstoneRita moved too quickly!3.88,0.00,1.06 (4.02)
[18:21:40] [Client thread/INFO]: [CHAT] achievement [Diamonds!]
[18:26:11] [Server thread/INFO]: RedstoneRita issued server command: /home base
[18:40:02] [Client thread/INFO]: Stopping!

4,412 lines · resource packs: Default, mapart-smoothing, server-resource-pack
classes loaded: net.minecraft.* + org.apache.logging.* (+2 other vanilla)`
      },
      {
        id: "f_mods3",
        title: "mods\\ (folder listing)",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\",
        meta: "1 file ·2026-05-04",
        kind: "evidence",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\mods> dir

2026-05-0412:22        512,032  cosmetic-elytra-tweaks-1.8.jar
        1 File(s)        512,032 bytes

jar tf cosmetic-elytra-tweaks-1.8.jar | head -5
  mcmod.info
  net/elytra/cosmetics/ElytraTweaks.class
  net/elytra/cosmetics/Trails.class

mcmod.info → "modid": "cosmetictweaks", "name": "Cosmetic Elytra Tweaks"`
      },
      {
        id: "f_versions3",
        title: "1.7.10\\ (version folder)",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\versions\\",
        meta: "folder ·2024-12-19",
        kind: "trap",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\versions> dir

2024-12-1910:05    <DIR>          1.7.10
2026-05-0412:20    <DIR>          1.8.9

C:\\...\\versions\\1.7.10> dir
2024-12-1910:05        8,914,201  1.7.10.jar
2024-12-1910:05            22,801  1.7.10.json

sha1(1.7.10.jar) =9ad0a2e5b8b3f47f8d9e2d8b1b5aa4c11d86be12
Mojang manifest id1.7.10 → match: YES`
      },
      {
        id: "f_screens",
        title: "screenshots\\",
        path: "C:\\Users\\Steve\\AppData\\Roaming\\.minecraft\\",
        meta: "28 files",
        kind: "neutral",
        detail:
`C:\\...\\minecraft\\screenshots> dir /o-d

2026-09-3018:16      1,204,881 2026-09-30_18.16.22.png
2026-09-3018:15      1,198,332 2026-09-30_18.15.07.png
2026-09-1409:44      1,099,144 2026-09-14_09.44.51.png
...
28 files ·3 added in last30 days`
      },
      {
        id: "f_history3",
        title: "History",
        path: "C:\\Users\\Steve\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\",
        meta: "SQLite database · browser history",
        kind: "rights",
        detail:
`Chrome — Default\\User Data\\History

History.db            44,018,688 bytes    last write2026-09-30 17:55
tables:
  urls      18,441 rows
  visits    24,009 rows
  downloads    57 rows`
      },
      {
        id: "f_temp3",
        title: "nvcache.tmp",
        path: "C:\\Users\\Steve\\AppData\\Local\\Temp\\",
        meta: "512 KB ·2026-09-30",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> dir /o-d | more

2026-09-3018:02       524,288  nvcache.tmp
2026-09-3017:58        41,902  Chromium-CrashPad-1759249082.dmp
2026-09-3009:11         2,048  ~DF4C91.tmp
...`
      }
    ],
    processes: [
      { id: "p_javaw3", title: "javaw.exe", meta: "PID 6604 · Oracle", kind: "neutral",
        detail:
`CommandLine:
  javaw.exe -Xmx3G -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main

ExecutablePath : C:\\Program Files\\Java\\jre1.8.0_411\\bin\\javaw.exe
Signer         : Oracle Corporation (chain valid)
Modules        :74 · injected modules:0` },
      { id: "p_python", title: "python.exe", meta: "PID 8120 · Python Software Fdn", kind: "trap",
        detail:
`CommandLine:
  python.exe -m http.server8080

ExecutablePath : C:\\Users\\Steve\\AppData\\Local\\Programs\\Python\\Python312\\python.exe
Signer         : Python Software Foundation (chain valid, not-before2024-01-11)
Listening      : TCP0.0.0.0:8080 (LAN)
Started        :2026-09-3017:44:02` },
      { id: "p_discord3", title: "Discord.exe", meta: "PID 3140 · Discord Inc.", kind: "neutral",
        detail:
`CommandLine:
  "C:\\Users\\Steve\\AppData\\Local\\Discord\\app-1.0.9186\\Discord.exe" --branch=stable

Signer : Discord Inc. (chain valid)` },
      { id: "p_chrome", title: "chrome.exe", meta: "PID 7788 · Google LLC", kind: "neutral",
        detail:
`CommandLine:
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --profile-directory=Default

Signer : Google LLC (chain valid)` },
      { id: "p_explorer3", title: "explorer.exe", meta: "PID 2056 · Microsoft", kind: "neutral",
        detail:
`CommandLine:
  C:\\Windows\\explorer.exe

Signer : Microsoft Windows (chain valid)` },
      { id: "p_msmpeng3", title: "MsMpEng.exe", meta: "PID 1744 · Microsoft", kind: "neutral",
        detail:
`CommandLine:
  "C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe"

Signer : Microsoft Windows (chain valid)` }
    ],
    services: [
      { id: "s_eventlog3", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_sysmain3", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
42` },
      { id: "s_dcom3", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_dps3", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_sched3", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        START_TYPE         :2 AUTO_START` },
      { id: "s_bg3", title: "BgActivityMonitor", meta: "Running · Manual", kind: "neutral",
        detail:
`C:\\> sc query BgActivityMonitor

SERVICE_NAME: BgActivityMonitor
        STATE              :4 RUNNING
        START_TYPE         :3 DEMAND_START` }
    ],
    installed: [
      { id: "i_lunar", title: "Lunar Client", meta: "installed2024-09-08 · Lunar LLC", kind: "support",
        detail:
`DisplayName : Lunar Client
Publisher   : Lunar LLC
InstallDate :20240908
Signed by   : Lunar LLC (chain valid)
InstallLocation : C:\\Users\\Steve\\.lunarclient` },
      { id: "i_java3", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102` },
      { id: "i_discord3", title: "Discord", meta: "installed2023-11-21 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20231121` },
      { id: "i_steam3", title: "Steam", meta: "installed2022-06-14 · Valve", kind: "neutral",
        detail:
`DisplayName : Steam
Publisher   : Valve Corporation
InstallDate :20220614` }
    ],
    startup: [
      { id: "u_sec3", title: "SecurityHealthSystray", meta: "HKLM\\\\...\\\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"` },
      { id: "u_onedrive3", title: "OneDrive", meta: "HKCU\\\\...\\\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"` },
      { id: "u_adobe", title: "Adobe GC Invoker", meta: "HKLM\\\\...\\\\Run · Adobe", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "AdobeAAMUpdater-1.0"="C:\\Program Files (x86)\\Common Files\\Adobe\\OOBE\\PDApp\\UWA\\updater.exe"

Signer : Adobe Systems Incorporated (chain valid)` }
    ],
    scan: {
      label: "OCEAN-STYLE SCAN (SIMULATED)",
      blurb: "Ocean-style scan · build2026.9.30 · raw output below. The scanner does not get a vote.",
      results: [
        { id: "x_fp", title: "STRING_STATIC", meta: "severity: warning", kind: "trap",
          detail:
`[12:09:12] [SCAN] strings-match pass →1 hit
[12:09:12] [SCAN] STRING_STATIC  "aimsight"
    file : .minecraft\\resourcepacks\\mapart-smoothing\\pack.png
    offset: +0x1A3F   context: 3F 7B 4D 50 61 63 6B 00
    confidence:0.61 · rule STRINGS_STATIC · pack first seen2026-05-04
[12:09:12] [SCAN]1 rule match · scan.log written` },
        { id: "x_clean3", title: "GAME_FILES", meta: "severity: info", kind: "neutral",
          detail:
`[12:09:14] [SCAN] .minecraft\\versions\\ →196/196 hash OK
[12:09:14] [SCAN] .minecraft\\mods\\ →1 entry, hash-unknown (user mod)
[12:09:14] [SCAN] .minecraft\\resourcepacks\\ →4 entries (user content, unhashed)
[12:09:15] [SCAN]0 rule matches above threshold · scan.log written` }
      ]
    },
    debrief: {
      verdict: "NO BAN — nothing met the bar",
      summary: "The right call in a witch-hunt case is often the one nobody cheers.",
      points: [
        { h: "Rumor is not a report", b: "A chat message from a popular player and one suggestive clip never met the evidence standard. The check was the correct response; a ban would have been the failure." },
        { h: "Fight the false positives", b: "The scanner's string hit and the 1.7.10 folder both screamed-cheater to a tired eye. Both were noise. Flagging either would have put a false accusation in the report." },
        { h: "Clean checks are evidence too", b: "Intact services, an approved-list-only mods folder, and a clean session log are worth citing — the report should show what you checked, not just what you found." },
        { h: "The line you didn't cross", b: "Browser history stayed closed. In a case this thin, an invasive search is exactly where bad bans come from — and the recording would outlive your justification." }
      ]
    }
  }
];
