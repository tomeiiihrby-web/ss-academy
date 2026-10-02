/* SS Academy — scenario data for the simulator.
 * Content rule: every detail is RAW OUTPUT ONLY. No narration, no verdict words
 * ("clean", "nothing here", "healthy", "suspicious"). The reader judges.
 *
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
    "description": "extends client-side interaction range", "mcversion": "1.8.9" }

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
    launcherStartup: [
      {
        id: "ls_justice",
        title: "Justice Client · v2.4.1",
        meta: "mods:24 · launched2026-09-30 20:53:58",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe — startup log, 2026-09-30 20:53:58

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9-vanilla”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Checking for updates…
[00:00:05] Verifying checksums …
[00:00:06] 24 mods found in mods\\ folder
[00:00:07] 2026-09-30 20:53:58 0.234s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:08] Game ready.`
      },
      {
        id: "ls_lunar",
        title: "Lunar Client · v4.6.2",
        meta: "mods:58 · launched2026-09-30 20:54:02",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe — startup log, 2026-09-30 20:54:02

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 58 mods found in mods\\ folder
[00:00:06] 2026-09-30 20:54:02 0.201s  java -Xmx2G -cp lunar-launcher.jar LunarClientTweaker --version 1.8.9
[00:00:07] Game ready.`
      },
      {
        id: "ls_feather",
        title: "Feather Client · v5.6.11",
        meta: "mods:21 · launched2026-09-30 20:54:01",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe — startup log, 2026-09-30 20:54:01

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 21 mods found in mods\\ folder
[00:00:06] 2026-09-30 20:54:01 0.251s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:07] Game ready.`
      }
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

Signer: Valve Corporation (chain valid)` },
      { id: "u_discord", title: "Discord", meta: "HKCU\\...\\Run · Discord Inc.", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "Discord"="C:\\Users\\Steve\\AppData\\Local\\Discord\\Update.exe --processStart Discord.exe"

Signer: Discord Inc. (chain valid)` },
      { id: "u_awd", title: "AutoWarDll", meta: "HKCU\\...\\Run · unknown publisher", kind: "trap",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "AutoWarDll"="C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awdstart.exe"

C:\\> dir C:\\Users\\Steve\\AppData\\Roaming\\AWD
  2026-09-12 18:30        98,304  awdstart.exe
  2026-09-12 18:30          2,048  awdstart.exe.manifest
  2026-09-12 18:30            312  awdstart.exe.config

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awdstart.exe
Publisher : (no signature)
Type      : 64-bit PE, console` },
      { id: "u_dpf", title: "DesktopInfoPostFork", meta: "HKCU\\...\\Run · unknown publisher", kind: "trap",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "DesktopInfoPostFork"="C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe /hidden"

C:\\> ps
  Handles  NPM(K)  WorkingSet  PMSize  SessionName  SID  GameName
  1,204     82      96,124 K   54,036 K  0          0    C:\\Windows\\System32\\cmd.exe /c rundll32.exe C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.dll,RunDll

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe
Publisher : (no signature)` },
      { id: "u_vbox", title: "VirtualBoxService", meta: "HKLM\\...\\Services · Oracle", kind: "neutral",
        detail:
`HKLM\\SYSTEM\\CurrentControlSet\\Services\\vboxService
  Type        : 2 (SERVICE_KERNEL_DRIVER)
  StartType   : 3 (SYSTEM_START)
  DisplayName : VirtualBox Service

C:\\> sc query vboxService
  SERVICE_NAME: vboxService
  STATE: 4 RUNNING
  DISPLAY_NAME: VirtualBox Service (Oracle Corporation, 2012)` },
      { id: "u_wofer", title: "WorldEditForge", meta: "HKCU\\...\\Run · EngineHub", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "WorldEditForge"="C:\\Program Files (x86)\\WorldEditForge\\we.exe"

Signer: EngineHub Inc. (chain valid)`
      }
    ],
    processes: [
      { id: "p_javaw", title: "javaw.exe", meta: "PID 7412 · Oracle", kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 7412" /v

Image Name                     PID Session  SID  Session# Mem Usage  CPU Time  User Name
javaw.exe                       7412  0       0      1 2,412,096 K 8.45 %     0:31.22  Steven

C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 7412" /m

javaw.exe                       7412  Modules
  MSCOREE.4.DLL
  VKMSPLUGIN.DLL
  java_crash.dll
  jvm.dll
  netman.dll

C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 7412" /v /fo csv
javaw.exe,7412,,,,2,2,412,032 K,8,031,234 K,0,31.22,Steven`

      },
      { id: "p_injector", title: "injector.exe", meta: "PID 9840 · Unknown publisher · seq 29172? · hwid #staygu", kind: "evidence",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 9840" /v

Image Name                     PID Session  SID  Session# Mem Usage  CPU Time  User Name
injector.exe                    9840  0       0      1 24,176 K    1.20 %     0:01.04  Steven

C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 9840" /m

injector.exe                    9840  Modules
  KERNEL32.DLL
  ntdll.dll
  ADVAPI32.dll
  PSAPI.DLL
  VERSION.dll
  ws2_32.dll
  ws2tcpip.dll
  MSVCRT.dll

C:\\Users\\Steve\\AppData\\Local\\Temp> wmic process where processid=9840 get commandline,executablepath,parentprocessid
  CommandLine    : injector.exe --target7412 --payload C:\\Users\\Steve\\AppData\\Local\\Temp\\load.dll
  ExecutablePath : C:\\Users\\Steve\\AppData\\Local\\Temp\\injector.exe
  ParentPID      :7004 (powershell.exe)

C:\\> sigcheck64 -accepteula injector.exe
  Publisher: (no signature)
  Version :1.0.0.3
  Path    : C:\\Users\\Steve\\AppData\\Local\\Temp\\injector.exe`
      },
      { id: "p_powershell", title: "powershell.exe", meta: "PID 7004 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 7004" /v

powershell.exe                  7004  0       0      1 68,128 K    0.45 %     0:02.11  Steven

C:\\> tasklist /fi "pid eq 7004" /m
powershell.exe                  7004  Modules
  KERNEL32.DLL
  ntdll.dll
  ADVAPI32.dll
  PSAPI.DLL
  VERSION.dll
  ws2_32.dll
  ws2tcpip.dll
  MSVCRT.dll
  IEFRAME.dll
  MSASN1.dll
  WPKIUtil.dll
  WINHTTP.dll
  CRYPT32.dll
  SECUR32.dll
  GDI32.dll
  USER32.dll
  kernel.appcore.dll
  SHCORE.dll
  SHELL32.dll
  COMCTL32.dll
  SPROGIDL.dll
  OLEAUT32.dll
  ONLRESOLV.dll
  URLLOWLIB.dll
  OLEAUT32.dll
  BROWSCAN.dll
  ATL.DLL
  DXGI.dll
  DINPUT8.dll
  DXGI.DLL
  KERNELBASE.dll
  ucrtbase.dll

C:\\> wmic process where processid=7004 get commandline
  CommandLine : powershell.exe -ExecutionPolicy Bypass -File C:\\Users\\Steve\\AppData\\Local\\Temp\\runme.ps1`
      },
      { id: "p_runme", title: "runme.ps1", meta: "PID unknown · temp script", kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> type runme.ps1
  param([string]$target, [string]$payload)
  Start-Process -FilePath "javaw.exe" -ArgumentList "-Xmx2G","-cp",".minecraft\\versions\\1.8.9\\1.8.9.jar","net.minecraft.client.main.Main" -RedirectStandardOutput "C:\\Users\\Steve\\AppData\\Local\\Temp\\inject.log"
  (Get-Content "C:\\Users\\Steve\\AppData\\Local\\Temp\\load.dll") -replace "old","new" | Set-Content "C:\\Users\\Steve\\AppData\\Local\\Temp\\load.dll"`
      },
      { id: "p_discord", title: "Discord.exe", meta: "PID 3312 · Discord Inc.", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3312" /v

Discord.exe                     3312  0       0      1 148,224 K  2.17 %     0:30.28  Steven

C:\\> tasklist /fi "pid eq 3312" /m
  Discord.exe  3312  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL
    MSCTF.DLL`
      },
      { id: "p_explorer", title: "explorer.exe", meta: "PID 2804 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 2804" /v

explorer.exe                    2804  0       0      1 42,368 K    0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 2804" /m
  explorer.exe  2804  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    USERENV.dll
    UNICOWS.DLL
    SHCORE.dll
    API-MS-Win-Core-LibraryLoader-L1-1-0.DLL
    api-ms-win-core-memory-L1-1-0.DLL
    api-ms-win-core-sysinfo-l1-1-0.DLL
    api-ms-win-core-heap-l1-1-0.DLL
    ntoskrnl.exe`
      },
      { id: "p_msmpeng", title: "MsMpEng.exe", meta: "PID 1836 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 1836" /v

MsMpEng.exe                   1836  0       0      1 148 MB      2.45 %     0:15.10  SYSTEM
C:\\> tasklist /fi "pid eq 1836" /m
  MsMpEng.exe  1836  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    CRYPT32.dll
    SECUR32.dll
    BCrypt.dll
    DIsPapi.dll
    IEFRAME.dll
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll`
      },
      { id: "p_svchost", title: "svchost.exe", meta: "PID 1104 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 1104" /v

svchost.exe                   1104  0       0      1 48,256 K    0.25 %     0:08.41  SYSTEM
C:\\> tasklist /fi "pid eq 1104" /m
  svchost.exe  1104  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    CRYPT32.dll
    SECUR32.dll
    WS2_32.dll
    WINMM.dll
    USAbdioctl.dll
    WLDAP32.dll
    USERENV.dll
    WINMM.dll
    SHCORE.dll
    NLSFUNC.dll
    SETUPAPI.dll
    SRCAP.dll`
      },
      { id: "p_dllhost", title: "dllhost.exe", meta: "PID 3028 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3028" /v

dllhost.exe                     3028  0       0      1 12,288 K    0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 3028" /m
  dllhost.exe  3028  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    CLSNT32.DLL
    DCC_WEB.DLL
    NETUTILS.DLL
    SHDOCVW.DLL
    MSCTF.DLL
    USERENV.dll`
      },
      { id: "p_taskmgr", title: "TaskManager.exe", meta: "PID 5501 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 5501" /v

TaskManager.exe                 5501  0       0      1 8,192 K     0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 5501" /m
  TaskManager.exe  5501  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    USERENV.dll
    UNICOWS.DLL
    SHCORE.dll
    KERNELAPP.DLL`
      },
      { id: "p_cmstp", title: "CMSTP.exe", meta: "PID 6122 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 6122" /v

CMSTP.exe                       6122  0       0      1 9,216 K     0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 6122" /m
  CMSTP.exe  6122  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    NETAPI32.dll
    MSPI.DLL
    MSINET.DLL`
      },
      { id: "p_rundll32", title: "rundll32.exe", meta: "PID 4211 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 4211" /v

rundll32.exe                    4211  0       0      1 6,144 K     0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 4211" /m
  rundll32.exe  4211  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWMAPI.dll
    DInput8.dll
    WINMM.dll
    IMM32.dll
    MSCTF.DLL`
      },
      { id: "p_notepad", title: "notepad.exe", meta: "PID 8890 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 8890" /v

notepad.exe                     8890  0       0      1 6,144 K     0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 8890" /m
  notepad.exe  8890  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    UNICOWS.DLL
    USRCLASS.DLL`
      },
      { id: "p_wmiprvse", title: "wmiprvse.exe", meta: "PID 2501 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 2501" /v

wmiprvse.exe                    2501  0       0      1 10,240 K    0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 2501" /m
  wmiprvse.exe  2501  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    IEFRAME.dll
    MSCTF.DLL
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll`
      },
      { id: "p_winlogon", title: "winlogon.exe", meta: "PID 688 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 688" /v

winlogon.exe                     688  0       0      1 8,192 K     0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 688" /m
  winlogon.exe  688  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    CRYPT32.dll
    SECUR32.dll
    DWM.dll
    SHCORE.dll
    APPHELP.DLL
    USERENV.dll`
      },
      { id: "p_csrss", title: "csrss.exe", meta: "PID 724 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 724" /v

csrss.exe                        724  0       0      1 14,336 K    0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 724" /m
  csrss.exe  724  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    USER32.dll
    KERNELBASE.dll
    SHCORE.dll
    API-MS-Win-Core-Thread-L1-1-0.DLL
    API-MS-Win-Core-Console-L1-1-0.DLL
    API-MS-Win-Core-File-L1-1-0.DLL
    API-MS-Win-Core-ProcessEnv-L1-1-0.DLL
    API-MS-Win-Security-Lsa-L1-1-0.DLL
    API-MS-Win-Security-Base-L1-1-0.DLL`
      },
      { id: "p_winsrv", title: "winsrv.exe", meta: "PID 856 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 856" /v

winsrv.exe                       856  0       0      1 10,240 K    0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 856" /m
  winsrv.exe  856  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    SHCORE.dll
    GDI32.dll
    USER32.dll
    KERNELBASE.dll`
      },
      { id: "p_spoolsv", title: "spoolsv.exe", meta: "PID 902 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 902" /v

spoolsv.exe                     902  0       0      1 16,384 K    0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 902" /m
  spoolsv.exe  902  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    SPOOLSS.DLL
    VDICPL32.DLL
    DWMAPI.dll
    USERENV.dll`
      },
      { id: "p_atiadlxy", title: "atiadlxy.dll", meta: "PID unknown · AMD driver", kind: "neutral",
        detail:
`C:\\Windows\\System32\\drivers> tasklist /m /fi "modulename eq atiadlxy.dll"

  Module name: atiadlxy.dll
  Process ID: 7412 (javaw.exe)
  Image Path: C:\\Windows\\System32\\DriverStore\\FileRepository\\atiadlxy.inf_amd64_neutral_6f4e1c4a9b8d\\atiadlxy.dll

C:\\> sigcheck64 -v C:\\Windows\\System32\\drivers\\atiadlxy.dll
  Publisher : Advanced Micro Devices, Inc. (valid)
  Version : 16.30.31.3255
  Path    : C:\\Windows\\System32\\drivers\\atiadlxy.dll`
      },
      { id: "p_nvwgks", title: "nvwgks.64.sys", meta: "PID unknown · NVIDIA driver", kind: "neutral",
        detail:
`C:\\Windows\\System32\\drivers> tasklist /m /fi "modulename eq nvwgks.64.sys"

  Module name: nvwgks.64.sys
  Process ID: 7412 (javaw.exe)

C:\\> sigcheck64 -v C:\\Windows\\System32\\drivers\\nvwgks.64.sys
  Publisher : NVIDIA Corporation (valid)
  Version : 471.14
  Path    : C:\\Windows\\System32\\drivers\\nvwgks.64.sys`
      },
      { id: "p_aswJfFlt", title: "asw0jfflt.sys", meta: "PID unknown · AV engine", kind: "neutral",
        detail:
`C:\\Windows\\System32\\drivers> tasklist /m /fi "modulename eq asw0jfflt.sys"

  Module name: asw0jfflt.sys
  Process ID: 1836 (MsMpEng.exe)

C:\\> sigcheck64 -v C:\\Windows\\System32\\drivers\\asw0jfflt.sys
  Publisher : Microsoft Corporation (valid)
  Version : 4.18.24090.11-0
  Path    : C:\\Windows\\System32\\drivers\\asw0jfflt.sys`
      },
      { id: "p_cisdhal", title: "cisdhal.dll", meta: "PID unknown · AMD", kind: "neutral",
        detail:
`C:\\Windows\\System32\\drivers> tasklist /m /fi "modulename eq cisdhal.dll"

  Module name: cisdhal.dll
  Process ID: 7412 (javaw.exe)

C:\\> sigcheck64 -v C:\\Windows\\System32\\drivers\\cisdhal.dll
  Publisher : Advanced Micro Devices, Inc. (valid)
  Version : 16.30.31.3255
  Path    : C:\\Windows\\System32\\drivers\\cisdhal.dll`
      },
      { id: "p_nvata", title: "nvata.sys", meta: "PID unknown · NVIDIA", kind: "neutral",
        detail:
`C:\\Windows\\System32\\drivers> tasklist /m /fi "modulename eq nvata.sys"

  Module name: nvata.sys
  Process ID: 1836 (MsMpEng.exe)

C:\\> sigcheck64 -v C:\\Windows\\System32\\drivers\\nvata.sys
  Publisher : NVIDIA Corporation (valid)
  Version : 471.14
  Path    : C:\\Windows\\System32\\drivers\\nvata.sys`
      },
      { id: "p_msvxd", title: "msvxhl.exe", meta: "PID 1002 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 1002" /v

msvxhl.exe                     1002  0       0      1 2,048 K     0.00 %     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 1002" /m
  msvxhl.exe  1002  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    WINMM.dll
    USERENV.dll
    WININET.dll
    CRYPT32.dll
    SECUR32.dll
    IMM32.dll
    DWMAPI.dll`
      },
      { id: "p_wininit", title: "wininit.exe", meta: "PID 460 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 460" /v

wininit.exe                     460  0       0      1 8,192 K     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 460" /m
  wininit.exe  460  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    SHCORE.dll
    USERENV.dll
    WININET.dll
    URLLOWLIB.dll
    CRYPT32.dll
    SECUR32.dll`
      },
      { id: "p_msvs32", title: "msvcp140.dll", meta: "PID unknown · Microsoft redist", kind: "neutral",
        detail:
`C:\\Windows\\System32> tasklist /m /fi "modulename eq msvcp140.dll"

  Module name: msvcp140.dll
  Process ID: 7412 (javaw.exe)
  Image Path: C:\\WINDOWS\\SYSTEM32\\MSVCP140.DLL

C:\\> sigcheck64 -v C:\\WINDOWS\\SYSTEM32\\MSVCP140.DLL
  Publisher : Microsoft Corporation (valid)
  Version : 14.0.30429.0
  Path    : C:\\WINDOWS\\SYSTEM32\\MSVCP140.DLL`
      },
      { id: "p_vcruntime", title: "vcruntime140.dll", meta: "PID unknown · Microsoft redist", kind: "neutral",
        detail:
`C:\\Windows\\System32> tasklist /m /fi "modulename eq vcruntime140.dll"

  Module name: vcruntime140.dll
  Process ID: 7412 (javaw.exe)
  Image Path: C:\\WINDOWS\\SYSTEM32\\VCRUNTIME140.DLL

C:\\> sigcheck64 -v C:\\WINDOWS\\SYSTEM32\\VCRUNTIME140.DLL
  Publisher : Microsoft Corporation (valid)
  Version : 14.0.30429.0
  Path    : C:\\WINDOWS\\SYSTEM32\\VCRUNTIME140.DLL`
      },
      { id: "p_verclsid", title: "verclsid.exe", meta: "PID 3336 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3336" /v

verclsid.exe                    3336  0       0      1 5,120 K     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 3336" /m
  verclsid.exe  3336  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    CRYPT32.dll
    SECUR32.dll`
      },
      { id: "p_userinit", title: "userinit.exe", meta: "PID 920 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 920" /v

userinit.exe                      920  0       0      1 7,168 K     0:00.00  SYSTEM

C:\\> tasklist /fi "pid eq 920" /m
  userinit.exe  920  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    SHCORE.dll
    USERENV.dll
    WININET.dll
    CRYPT32.dll
    SECUR32.dll
    IMM32.dll`
      },
      { id: "p_dwmapi", title: "dwmapi.dll", meta: "PID unknown · Microsoft", kind: "neutral",
        detail:
`C:\\Windows\\System32> tasklist /m /fi "modulename eq dwmapi.dll"

  Module name: dwmapi.dll
  Process ID: 2804 (explorer.exe)
  Image Path: C:\\WINDOWS\\SYSTEM32\\DWMAPI.DLL

C:\\> sigcheck64 -v C:\\WINDOWS\\SYSTEM32\\DWMAPI.DLL
  Publisher : Microsoft Corporation (valid)
  Version : 10.0.22621.1
  Path    : C:\\WINDOWS\\SYSTEM32\\DWMAPI.DLL`
      },
      { id: "p_SpVoice", title: "SPVoice.dll", meta: "PID unknown · Microsoft", kind: "neutral",
        detail:
`C:\\Windows\\System32> tasklist /m /fi "modulename eq SPVoice.dll"

  Module name: SPVoice.dll
  Process ID: 1836 (MsMpEng.exe)
  Image Path: C:\\WINDOWS\\SYSTEM32\\SPVOICE.DLL

C:\\> sigcheck64 -v C:\\WINDOWS\\SYSTEM32\\SPVOICE.DLL
  Publisher : Microsoft Corporation (valid)
  Version : 10.0.22621.1
  Path    : C:\\WINDOWS\\SYSTEM32\\SPVOICE.DLL`
      },
      { id: "p_awd_os", title: "awd.exe", meta: "PID 7741 · unknown publisher · MAC a8:20:5a:29:17:2d · serial #staygu", kind: "trap",
        detail:
`C:\\Users\\Steve\\AppData\\Roaming\\AWD> tasklist /fi "pid eq 7741" /v

awd.exe                         7741  0       0      1 30,720 K    0.85 %     0:05.42  Steven

C:\\> tasklist /fi "pid eq 7741" /m
  awd.exe  7741  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWRITE.DLL
    DWRITE_DLL
    D3D12.dll
    DXGI.DLL
    MSCTF.DLL
    VCRUNTIME140.dll
    VCRUNTIME140_1.dll

C:\\> wmic process where processid=7741 get commandline
  CommandLine : awd.exe --window-style hidden --process-start "C:\\Windows\\System32\\cmd.exe"

C:\\> sigcheck64 -accepteula C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awd.exe
  Publisher: (no signature)
  Version :2.4.1.7
  Path    : C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awd.exe`
      },
      { id: "p_dpf_exe", title: "dpf.exe", meta: "PID 8322 · unknown publisher · mac 04:8a:29:17:2a:3c · serial sta271", kind: "trap",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 8322" /v

dpf.exe                         8322  0       0      1 12,288 K    0.30 %     0:02.10  Steven

C:\\> tasklist /fi "pid eq 8322" /m
  dpf.exe  8322  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    D3D12.dll
    D3D12CORELIBRARY.dll
    D3DCOMPILER_47.dll
    D3D11_DLL
    D3D10_DLL
    D3D9.DLL
    DInput8.dll
    WINMM.dll
    IMM32.dll
    MSCTF.DLL
    V{diagoverlay}.dll
    D3D12.dll
    DXGI.DLL
    SHCORE.dll
    USERENV.dll

C:\\> wmic process where processid=8322 get commandline
  CommandLine : dpf.exe /hidden

C:\\> sigcheck64 -accepteula C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe
  Publisher: (no signature)
  Version :1.0.0.3
  Path    : C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe`
      }
    ],
    services: [
      { id: "s_eventlog", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

Get-Service EventLog → Status: Running` },
      { id: "s_sysmain", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
18`
      },
      { id: "s_dcom", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_dps", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_sched", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

C:\\> schtasks /query | find /c "2026"
41`
      },
      { id: "s_dusm", title: "DusmSvc (Data Usage)", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DusmSvc

SERVICE_NAME: DusmSvc
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_bg", title: "BgActivityMonitor", meta: "Running · Manual", kind: "neutral",
        detail:
`C:\\> sc query BgActivityMonitor

SERVICE_NAME: BgActivityMonitor
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :3 DEMAND_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      }
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
No signature chain present for subject 'cheatengine.org'`
      },
      { id: "i_java", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102
Signed by   : Oracle America, Inc. (chain valid)`
      },
      { id: "i_discord", title: "Discord", meta: "installed2024-03-18 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20240318`
      },
      { id: "i_steam", title: "Steam", meta: "installed2023-01-09 · Valve", kind: "neutral",
        detail:
`DisplayName : Steam
Publisher   : Valve Corporation
InstallDate :20230109`
      },
      { id: "i_awd", title: "AWD Overlay v2.4", meta: "installed2026-09-12 · publisher: (not verified)", kind: "evidence",
        detail:
`C:\\> reg query "HKLM\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "AWD Overlay"

DisplayName      : AWD Overlay v2.4
DisplayVersion   :2.4.1.7
Publisher        : (not verified)
InstallDate      :20260912
EstimatedSize    :45,056 KB
UninstallString  : "C:\\Users\\Steve\\AppData\\Roaming\\AWD\\uninstall.exe"
Signer           : no signature found for publisher '(not verified)'
KeyPath          : C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awd.exe`
      },
      { id: "i_dpf", title: "DesktopPostFork v1.0", meta: "installed2026-09-12 · publisher: (not verified)", kind: "evidence",
        detail:
`C:\\> reg query "HKLM\\Microsoft\\Windows\\CurrentVersion\\Uninstall" /s /f "DesktopPostFork"

DisplayName      : DesktopPostFork v1.0
DisplayVersion   :1.0.0.3
Publisher        : (not verified)
InstallDate      :20260912
EstimatedSize    :12,288 KB
UninstallString  : "C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe"
Signer           : no signature found for publisher '(not verified)'
KeyPath          : C:\\Users\\AppData\\Local\\Temp\\dpf.exe`
      },
      { id: "i_java2", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102`
      },
      { id: "i_discord2", title: "Discord", meta: "installed2024-07-30 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20240730`
      },
      { id: "i_lunar", title: "Lunar Client", meta: "installed2024-09-08 · Lunar LLC", kind: "support",
        detail:
`DisplayName : Lunar Client
Publisher   : Lunar LLC
InstallDate :20240908
Signed by   : Lunar LLC (chain valid)
InstallLocation : C:\\Users\\Steve\\.lunarclient`
      },
      { id: "i_gfe", title: "NVIDIA GeForce Experience", meta: "installed2024-05-12 · NVIDIA", kind: "neutral",
        detail:
`DisplayName : NVIDIA GeForce Experience3.27.0.105
Publisher   : NVIDIA Corporation
InstallDate :20240512`
      }
    ],
    startup: [
      { id: "u_sec", title: "SecurityHealthSystray", meta: "HKLM\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"`

      },
      { id: "u_onedrive", title: "OneDrive", meta: "HKCU\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"`

      },
      { id: "u_steam", title: "Steam", meta: "HKCU\\...\\Run · Valve", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "Steam"="C:\\Program Files (x86)\\Steam\\steam.exe -silent"`

      },
      { id: "u_discord", title: "Discord", meta: "HKCU\\...\\Run · Discord Inc.", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "Discord"="C:\\Users\\Steve\\AppData\\Local\\Discord\\Update.exe --processStart Discord.exe"`

      },
      { id: "u_awd", title: "AWD Overlay v2.4", meta: "HKCU\\...\\Run · unknown publisher", kind: "evidence",
        detail:
`C:\\> reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"

  "AWD Overlay v2.4"  REG_SZ  "C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awdstart.exe"

C:\\> dir C:\\Users\\Steve\\AppData\\Roaming\\AWD
  2026-09-12 18:30        98,304  awdstart.exe

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Roaming\\AWD\\awdstart.exe
  Publisher : (no signature)`
      },
      { id: "u_dpf", title: "DesktopPostFork v1.0", meta: "HKCU\\...\\Run · unknown publisher", kind: "evidence",
        detail:
`C:\\> reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"

  "DesktopPostFork v1.0"  REG_SZ  "C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe /hidden"

C:\\> dir C:\\Users\\Steve\\AppData\\Local\\Temp
  2026-09-12 18:30        12,288  dpf.exe

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Local\\Temp\\dpf.exe
  Publisher : (no signature)`
      },
      { id: "u_wofer", title: "WorldEditForge", meta: "HKCU\\...\\Run · EngineHub", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "WorldEditForge"="C:\\Program Files (x86)\\WorldEditForge\\we.exe"`

      },
      { id: "u_vbox", title: "VirtualBoxService", meta: "HKLM\\...\\Services · Oracle", kind: "neutral",
        detail:
`HKLM\\SYSTEM\\CurrentControlSet\\Services\\vboxService
  Type        : 2 (SERVICE_KERNEL_DRIVER)
  StartType   : 3 (SYSTEM_START)
  DisplayName : VirtualBox Service

C:\\> sc query vboxService
  SERVICE_NAME: vboxService
  STATE: 4 RUNNING
  DISPLAY_NAME: VirtualBox Service (Oracle Corporation, 2012)`
      }
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
        { id: "x_pack", title: "MOD_PACK_UNVERIFIED", meta: "severity: warning", kind: "support", needs: "mf_max",
          detail:
`[12:04:11] [SCAN] mod folder walk →3 folders
    mods-begg-1.8  →22 jars · 21 hash-known · 1 unknown
    mods-hx-1.20   →64 jars · 63 hash-known · 1 unknown
    mods-zeta-1.20 →128 jars · 0 hash-known · 128 unknown
[12:04:11] [SCAN] rule MOD_LIST_UNVERIFIED @ weight0.44 · no pack manifest published for 1.8/1.20
[12:04:11] [SCAN] note: pack contents are not classified - enumerate the folder yourself` },
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
      "She denies everything: “check everything, I'm clean.”\n" +
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
`C:\\Windows\\Prefetch> dir /o-d

GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf   188 KB   2026-09-28 21:14
GLCLIENT.LAUNCHER.EXE-7D3A9F22.pf   188 KB   2026-09-28 21:14

C:\\Windows\\Prefetch> pfparser GLCLIENT.LAUNCHER.EXE-7D3A9F21.pf

  Executable name : GLCLIENT.LAUNCHER.EXE
  Resolved path   : C:\\Users\\Steve\\AppData\\Local\\Ghost\\glclient.exe
  Version         :3.2.0.114
  Run count       :3
  First run       :2026-09-28 21:14:07
  Last run        :2026-09-29 22:03:41
  MFT timestamps  : created2026-09-2821:14 · modified2026-09-2922:03

Trace strings found in PF section:
  ghost-overlay64.dll · screen-capture-hook · d3d11.dll · PresentHook

C:\\Windows\\Prefetch> dir \"C:\\Users\\Steve\\AppData\\Local\\Ghost\\glclient.exe\"
  File Not Found`
      },
      {
        id: "f_ghost_folder",
        title: "Ghost\\ (folder)",
        path: "C:\\Users\\Steve\\AppData\\Local\\",
        meta: "empty ·2026-09-30",
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
        meta: "208 KB ·2026-09-30 19:02",
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
    launcherStartup: [
      {
        id: "ls_justice2",
        title: "Justice Client · v2.4.1",
        meta: "mods:24 · launched2026-09-30 20:54:00",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe — startup log, 2026-09-30 20:54:00

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9-vanilla”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Checking for updates…
[00:00:05] Verifying checksums …
[00:00:06] 24 mods found in mods\\ folder
[00:00:07] 2026-09-30 20:54:00 0.234s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:08] Game ready.`
      },
      {
        id: "ls_lunar2",
        title: "Lunar Client · v4.6.2",
        meta: "mods:58 · launched2026-09-30 20:54:02",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe — startup log, 2026-09-30 20:54:02

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 58 mods found in mods\\ folder
[00:00:06] 2026-09-30 20:54:02 0.201s  java -Xmx2G -cp lunar-launcher.jar LunarClientTweaker --version 1.8.9
[00:00:07] Game ready.`
      },
      {
        id: "ls_feather2",
        title: "Feather Client · v5.6.11",
        meta: "mods:21 · launched2026-09-30 20:54:01",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe — startup log, 2026-09-30 20:54:01

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 21 mods found in mods\\ folder
[00:00:06] 2026-09-30 20:54:01 0.251s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:07] Game ready.`
      }
    ],
    processes: [
      { id: "p_javaw2", title: "javaw.exe", meta: "PID 5528 · Oracle", kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 5528" /v

javaw.exe                       5528  0       0      1 2,456,576 K 2.17 %     0:28.44  Steven

C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 5528" /m
  javaw.exe  5528  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    IEFRAME.dll
    MSVCRT.dll
    VERSION.dll
    MSCOREE.4.DLL
    netman.dll
    VKMSPLUGIN.DLL

C:\\> wmic process where processid=5528 get commandline,modulesinjected
  CommandLine : javaw.exe -Xmx2G -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main
  ModulesInjected : 0`
      },
      { id: "p_discord2", title: "Discord.exe", meta: "PID 2860 · Discord Inc.", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 2860" /v

Discord.exe                     2860  0       0      1 148,224 K  1.95 %     0:28.22  Steven

C:\\> tasklist /fi "pid eq 2860" /m
  Discord.exe  2860  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL`
      },
      { id: "p_obs", title: "obs64.exe", meta: "PID 9012 · OBS Project", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 9012" /v

obs64.exe                       9012  0       0      1 68,128 K    0.80 %     0:09.11  Steven

C:\\> tasklist /fi "pid eq 9012" /m
  obs64.exe  9012  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWRITE.DLL
    D3D12.dll
    DXGI.DLL
    D3D11_DLL
    D3DCOMPILER_47.dll
    D3D10_DLL
    D3D9.DLL
    V{diagoverlay}.dll
    DInput8.dll
    WINMM.dll
    IMM32.dll
    MSCTF.DLL
    USERENV.dll
    DWMAPI.dll`
      },
      { id: "p_explorer2", title: "explorer.exe", meta: "PID 2144 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 2144" /v

explorer.exe                    2144  0       0      1 42,368 K    0.00 %     0:00.00  Steven

C:\\> tasklist /fi "pid eq 2144" /m
  explorer.exe  2144  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    USERENV.dll
    UNICOWS.DLL
    SHCORE.dll
    API-MS-Win-Core-LibraryLoader-L1-1-0.DLL
    api-ms-win-core-memory-L1-1-0.DLL
    api-ms-win-core-sysinfo-l1-1-0.DLL
    api-ms-win-core-heap-l1-1-0.DLL
    ntoskrnl.exe`
      },
      { id: "p_onedrive2", title: "OneDrive.exe", meta: "PID 3976 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3976" /v

OneDrive.exe                    3976  0       0      1 148,224 K  0.50 %     0:04.12  Steven

C:\\> tasklist /fi "pid eq 3976" /m
  OneDrive.exe  3976  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    USERENV.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWMAPI.dll
    USERENV.dll
    DWRITE.DLL
    D3D12.dll
    DXGI.DLL
    SHCORE.dll`
      },
      { id: "p_msmpeng2", title: "MsMpEng.exe", meta: "PID 1620 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 1620" /v

MsMpEng.exe                   1620  0       0      1 148 MB      2.45 %     0:15.10  SYSTEM
C:\\> tasklist /fi "pid eq 1620" /m
  MsMpEng.exe  1620  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    CRYPT32.dll
    SECUR32.dll
    BCrypt.dll
    DIsPapi.dll
    IEFRAME.dll
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll`
      },
      { id: "p_taskmgr2", title: "TaskManager.exe", meta: "PID 5501 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 5501" /v

TaskManager.exe                 5501  0       0      1 8,192 K     0:00.00  Steven

C:\\> tasklist /fi "pid eq 5501" /m
  TaskManager.exe  5501  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    USERENV.dll
    UNICOWS.DLL
    SHCORE.dll
    KERNELAPP.DLL`
      },
      { id: "p_cmstp2", title: "CMSTP.exe", meta: "PID 6122 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 6122" /v

CMSTP.exe                       6122  0       0      1 9,216 K     0:00.00  Steven

C:\\> tasklist /fi "pid eq 6122" /m
  CMSTP.exe  6122  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    NETAPI32.dll
    MSPI.DLL
    MSINET.DLL`
      },
      { id: "p_rundll322", title: "rundll32.exe", meta: "PID 4211 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 4211" /v

rundll32.exe                    4211  0       0      1 6,144 K     0:00.00  Steven

C:\\> tasklist /fi "pid eq 4211" /m
  rundll32.exe  4211  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWMAPI.dll
    DInput8.dll
    WINMM.dll
    IMM32.dll
    MSCTF.DLL`
      },
      { id: "p_edac", title: "EDAC.exe", meta: "PID 10445 · unknown publisher", kind: "trap",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 10445" /v

EDAC.exe                       10445  0       0      1 20,480 K    0.15 %     0:01.10  Steven

C:\\> tasklist /fi "pid eq 10445" /m
  EDAC.exe  10445  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    DWRITE.DLL
    D3D12.dll
    D3D12CORELIBRARY.dll
    D3DCOMPILER_47.dll
    D3D11_DLL
    D3D10_DLL
    D3D9.DLL
    DInput8.dll
    WINMM.dll
    IMM32.dll
    MSCTF.DLL
    V{diagoverlay}.dll
    D3D12.dll
    DXGI.DLL
    SHCORE.dll
    USERENV.dll

C:\\> wmic process where processid=10445 get commandline
  CommandLine : EDAC.exe --service hide --config C:\\Users\\Steve\\AppData\\Local\\Temp\\edac.cfg

C:\\> sigcheck64 -accepteula C:\\Users\\Steve\\AppData\\Local\\Temp\\EDAC.exe
  Publisher: (no signature)
  Version :0.9.8.2
  Path    : C:\\Users\\Steve\\AppData\\Local\\Temp\\EDAC.exe`
      },
      { id: "p_javaw3", title: "javaw.exe", meta: "PID 6604 · Oracle", kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 6604" /v

javaw.exe                       6604  0       0      1 2,512,384 K 3.20 %     0:31.05  Steven

C:\\> tasklist /fi "pid eq 6604" /m
  javaw.exe  6604  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    IEFRAME.dll
    MSVCRT.dll
    VERSION.dll
    MSCOREE.4.DLL
    netman.dll
    VKMSPLUGIN.DLL

C:\\> wmic process where processid=6604 get commandline,modulesinjected
  CommandLine : javaw.exe -Xmx3G -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main
  ModulesInjected : 0`
      },
      { id: "p_python", title: "python.exe", meta: "PID 8120 · Python Software Fdn", kind: "trap",
        detail:
`C:\\> tasklist /fi "pid eq 8120" /v

python.exe                      8120  0       0      1 12,288 K    0:00.00  Steven

C:\\> tasklist /fi "pid eq 8120" /m
  python.exe  8120  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    HTTPSYS.DLL
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll

C:\\> wmic process where processid=8120 get commandline
  CommandLine : python.exe -m http.server8080
  ExecutablePath : C:\\Users\\Steve\\AppData\\Local\\Programs\\Python\\Python312\\python.exe
  Signer         : Python Software Foundation (chain valid, not-before2024-01-11)
  Listening      : TCP0.0.0.0:8080 (LAN)
  Started        :2026-09-3017:44:02`
      },
      { id: "p_discord3", title: "Discord.exe", meta: "PID 3140 · Discord Inc.", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3140" /v

Discord.exe                     3140  0       0      1 148,224 K  1.50 %     0:24.10  Steven

C:\\> tasklist /fi "pid eq 3140" /m
  Discord.exe  3140  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL`
      },
      { id: "p_chrome", title: "chrome.exe", meta: "PID 7788 · Google LLC", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 7788" /v

chrome.exe                      7788  0       0      1 148,224 K  4.10 %     0:32.02  Steven

C:\\> tasklist /fi "pid eq 7788" /m
  chrome.exe  7788  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL
    SHCORE.dll
    USERENV.dll
    CRYPT32.dll
    WININET.dll`
      }
    ],
    services: [
      { id: "s_eventlog2", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

Get-Service EventLog → Status: Running` },
      { id: "s_sysmain2", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
44`
      },
      { id: "s_dcom2", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_dps2", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_sched2", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_bg", title: "BgActivityMonitor", meta: "Running · Manual", kind: "neutral",
        detail:
`C:\\> sc query BgActivityMonitor

SERVICE_NAME: BgActivityMonitor
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :3 DEMAND_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      }
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
KeyPath          : C:\\Users\\Steve\\AppData\\Local\\Ghost\\overlay-service.exe`
      },
      { id: "i_java2", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102`
      },
      { id: "i_discord2", title: "Discord", meta: "installed2024-07-30 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20240730`
      },
      { id: "i_gfe", title: "NVIDIA GeForce Experience", meta: "installed2024-05-12 · NVIDIA", kind: "neutral",
        detail:
`DisplayName : NVIDIA GeForce Experience3.27.0.105
Publisher   : NVIDIA Corporation
InstallDate :20240512`
      }
    ],
    startup: [
      { id: "u_thumbs", title: "system_tray_helper", meta: "HKCU\\...\\Run · unknown publisher", kind: "evidence",
        detail:
`C:\\> reg query "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"

  "system_tray_helper"  REG_SZ  "C:\\Users\\Steve\\AppData\\Roaming\\Thumbs\\cache.dat,Entry"

C:\\> dir C:\\Users\\Steve\\AppData\\Roaming\\Thumbs
  2026-09-2922:41        412,672  cache.dat

C:\\> sigcheck64 C:\\Users\\Steve\\AppData\\Roaming\\Thumbs\\cache.dat
  Publisher : (no signature)
  Type      :64-bit DLL,3 exports (Entry, DllRegisterServer, ?)`
      },
      { id: "u_sec2", title: "SecurityHealthSystray", meta: "HKLM\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"`
      },
      { id: "u_onedrive2", title: "OneDrive", meta: "HKCU\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"`
      }
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
  downloads      57 rows`
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
2026-09-3009:11         2,048  ~DF4C91.tmp`
      }
    ],
    launcherStartup: [
      {
        id: "ls_justice3",
        title: "Justice Client · v2.4.1",
        meta: "mods:24 · launched2026-09-30 18:11:50",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Justice\\launcher.exe — startup log, 2026-09-30 18:11:50

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9-vanilla”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Checking for updates…
[00:00:05] Verifying checksums …
[00:00:06] 24 mods found in mods\\ folder
[00:00:07] 2026-09-30 18:11:50 0.234s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:08] Game ready.`
      },
      {
        id: "ls_lunar3",
        title: "Lunar Client · v4.6.2",
        meta: "mods:58 · launched2026-09-30 18:12:00",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\LunarClient\\launcher.exe — startup log, 2026-09-30 18:12:00

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 58 mods found in mods\\ folder
[00:00:06] 2026-09-30 18:12:00 0.201s  java -Xmx2G -cp lunar-launcher.jar LunarClientTweaker --version 1.8.9
[00:00:07] Game ready.`
      },
      {
        id: "ls_feather3",
        title: "Feather Client · v5.6.11",
        meta: "mods:21 · launched2026-09-30 18:11:59",
        kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Feather\\launcher.exe — startup log, 2026-09-30 18:11:59

[00:00:01] Initializing launcher…
[00:00:02] Loading profile “1.8.9”
[00:00:03] Resolving game directory: C:\\Users\\Steve\\AppData\\Roaming\\.minecraft
[00:00:04] Verifying checksums …
[00:00:05] 21 mods found in mods\\ folder
[00:00:06] 2026-09-30 18:11:59 0.251s  java -Xmx2G -jar minecraft.jar --version 1.8.9
[00:00:07] Game ready.`
      }
    ],
    processes: [
      { id: "p_javaw3", title: "javaw.exe", meta: "PID 6604 · Oracle", kind: "neutral",
        detail:
`C:\\Users\\Steve\\AppData\\Local\\Temp> tasklist /fi "pid eq 6604" /v

javaw.exe                       6604  0       0      1 2,512,384 K 3.20 %     0:31.05  Steven

C:\\> tasklist /fi "pid eq 6604" /m
  javaw.exe  6604  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    IEFRAME.dll
    MSVCRT.dll
    VERSION.dll
    MSCOREE.4.DLL
    netman.dll
    VKMSPLUGIN.DLL

C:\\> wmic process where processid=6604 get commandline,modulesinjected
  CommandLine : javaw.exe -Xmx3G -cp .minecraft\\versions\\1.8.9\\1.8.9.jar net.minecraft.client.main.Main
  ModulesInjected : 0`
      },
      { id: "p_python", title: "python.exe", meta: "PID 8120 · Python Software Fdn", kind: "trap",
        detail:
`C:\\> tasklist /fi "pid eq 8120" /v

python.exe                      8120  0       0      1 12,288 K    0:00.00  Steven

C:\\> tasklist /fi "pid eq 8120" /m
  python.exe  8120  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    WININET.dll
    URLLOWLIB.dll
    WINHTTP.dll
    CRYPT32.dll
    SECUR32.dll
    HTTPSYS.DLL
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll

C:\\> wmic process where processid=8120 get commandline
  CommandLine : python.exe -m http.server8080
  ExecutablePath : C:\\Users\\Steve\\AppData\\Local\\Programs\\Python\\Python312\\python.exe
  Signer         : Python Software Foundation (chain valid, not-before2024-01-11)
  Listening      : TCP0.0.0.0:8080 (LAN)
  Started        :2026-09-3017:44:02`
      },
      { id: "p_discord3", title: "Discord.exe", meta: "PID 3140 · Discord Inc.", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 3140" /v

Discord.exe                     3140  0       0      1 148,224 K  1.50 %     0:24.10  Steven

C:\\> tasklist /fi "pid eq 3140" /m
  Discord.exe  3140  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL`
      },
      { id: "p_chrome", title: "chrome.exe", meta: "PID 7788 · Google LLC", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 7788" /v

chrome.exe                      7788  0       0      1 148,224 K  4.10 %     0:32.02  Steven

C:\\> tasklist /fi "pid eq 7788" /m
  chrome.exe  7788  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    CRYPT32.dll
    WS2_32.dll
    WINMM.dll
    DBGHELP.DLL
    PSAPI.DLL
    VERSION.dll
    MSVCRT.dll
    SHLWAPI.dll
    OLEAUT32.dll
    COMDLG32.dll
    USP10.dll
    DWRAP.dll
    dwmapi.dll
    IMM32.dll
    MSCTF.DLL
    UNICODEFORMAT.DLL
    MSCTF.CONV.COMBO.DLL
    MSCTF.DLL
    SHCORE.dll
    USERENV.dll
    CRYPT32.dll
    WININET.dll`
      },
      { id: "p_explorer3", title: "explorer.exe", meta: "PID 2056 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 2056" /v

explorer.exe                    2056  0       0      1 42,368 K    0:00.00  Steven

C:\\> tasklist /fi "pid eq 2056" /m
  explorer.exe  2056  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    COMDLG32.dll
    SHLWAPI.dll
    OLEAUT32.dll
    USERENV.dll
    UNICOWS.DLL
    SHCORE.dll
    API-MS-Win-Core-LibraryLoader-L1-1-0.DLL
    api-ms-win-core-memory-L1-1-0.DLL
    api-ms-win-core-sysinfo-l1-1-0.DLL
    api-ms-win-core-heap-l1-1-0.DLL
    ntoskrnl.exe`
      },
      { id: "p_msmpeng3", title: "MsMpEng.exe", meta: "PID 1744 · Microsoft", kind: "neutral",
        detail:
`C:\\> tasklist /fi "pid eq 1744" /v

MsMpEng.exe                   1744  0       0      1 148 MB      2.45 %     0:15.10  SYSTEM
C:\\> tasklist /fi "pid eq 1744" /m
  MsMpEng.exe  1744  Modules
    KERNEL32.DLL
    ntdll.dll
    ADVAPI32.dll
    KERNELBASE.dll
    USER32.dll
    GDI32.dll
    SHELL32.dll
    OLEAUT32.dll
    CRYPT32.dll
    SECUR32.dll
    BCrypt.dll
    DIsPapi.dll
    IEFRAME.dll
    WS2_32.dll
    MSVCRT.dll
    VERSION.dll`
      }
    ],
    services: [
      { id: "s_eventlog3", title: "EventLog", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query EventLog

SERVICE_NAME: EventLog
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

Get-Service EventLog → Status: Running` },
      { id: "s_sysmain3", title: "SysMain", meta: "Running · Automatic", kind: "support",
        detail:
`C:\\> sc query SysMain

SERVICE_NAME: SysMain
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0

C:\\> dir C:\\Windows\\Prefetch | find /c ".pf"
42`
      },
      { id: "s_dcom3", title: "DcomLaunch", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query DcomLaunch

SERVICE_NAME: DcomLaunch
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_dps3", title: "DPS", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Dps

SERVICE_NAME: Dps
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_sched3", title: "Task Scheduler", meta: "Running · Automatic", kind: "neutral",
        detail:
`C:\\> sc query Schedule

SERVICE_NAME: Schedule
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :2 AUTO_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      },
      { id: "s_bg3", title: "BgActivityMonitor", meta: "Running · Manual", kind: "neutral",
        detail:
`C:\\> sc query BgActivityMonitor

SERVICE_NAME: BgActivityMonitor
        STATE              :4 RUNNING
        WIN32_EXIT_CODE    :0
        STOP_CODE          :0
        SERVICES_START_TYPE :3 DEMAND_START
        SERVICES_ERROR_CONTROL:1
        WAIT_HINT          :0
        CHECKPOINT         :0
        TOTAL_DELAY        :0`
      }
    ],
    installed: [
      { id: "i_lunar", title: "Lunar Client", meta: "installed2024-09-08 · Lunar LLC", kind: "support",
        detail:
`DisplayName : Lunar Client
Publisher   : Lunar LLC
InstallDate :20240908
Signed by   : Lunar LLC (chain valid)
InstallLocation : C:\\Users\\Steve\\.lunarclient`
      },
      { id: "i_java3", title: "Java8 Update411", meta: "installed2025-11-02 · Oracle", kind: "neutral",
        detail:
`DisplayName : Java8 Update411
Publisher   : Oracle Corporation
InstallDate :20251102`
      },
      { id: "i_discord3", title: "Discord", meta: "installed2023-11-21 · Discord Inc.", kind: "neutral",
        detail:
`DisplayName : Discord
Publisher   : Discord Inc.
InstallDate :20231121`
      },
      { id: "i_steam3", title: "Steam", meta: "installed2022-06-14 · Valve", kind: "neutral",
        detail:
`DisplayName : Steam
Publisher   : Valve Corporation
InstallDate :20220614`
      }
    ],
    startup: [
      { id: "u_sec3", title: "SecurityHealthSystray", meta: "HKLM\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "SecurityHealthSystray"="%windir%\\system32\\SecurityHealthSystray.exe"`
      },
      { id: "u_onedrive3", title: "OneDrive", meta: "HKCU\\...\\Run · Microsoft", kind: "neutral",
        detail:
`HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "OneDrive"="C:\\Users\\Steve\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe /background"`
      },
      { id: "u_adobe", title: "Adobe GC Invoker", meta: "HKLM\\...\\Run · Adobe", kind: "neutral",
        detail:
`HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run
  "AdobeAAMUpdater-1.0"="C:\\Program Files (x86)\\Common Files\\Adobe\\OOBE\\PDApp\\PDAppUpdater.exe"`

      }
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
