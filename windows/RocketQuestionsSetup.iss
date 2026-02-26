#define MyAppName "Rocket Questions"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "rocket-questions"
#define MyAppExeName "netc_pop_quiz.py"

[Setup]
AppId={{A2CF9172-9D39-49F2-A807-1B4655AB0F1C}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={localappdata}\\RocketQuestions
DisableProgramGroupPage=yes
OutputDir=Output
OutputBaseFilename=RocketQuestionsSetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=lowest

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "..\\netc_pop_quiz.py"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\requirements.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week1_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week2_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week3_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week4_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week5_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\week6_question_bank.csv"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\\rocket_icon.png"; DestDir: "{app}"; Flags: ignoreversion
Source: "install_dependencies.ps1"; DestDir: "{app}\\windows"; Flags: ignoreversion

[Icons]
Name: "{autodesktop}\\Rocket Questions"; Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File \"{app}\\windows\\install_dependencies.ps1\""; WorkingDir: "{app}"; IconFilename: "{sys}\\shell32.dll"; IconIndex: 220
Name: "{userprograms}\\Rocket Questions"; Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File \"{app}\\windows\\install_dependencies.ps1\""; WorkingDir: "{app}"; IconFilename: "{sys}\\shell32.dll"; IconIndex: 220

[Run]
Filename: "powershell.exe"; Parameters: "-ExecutionPolicy Bypass -File \"{app}\\windows\\install_dependencies.ps1\""; StatusMsg: "Installing Python dependencies..."; Flags: postinstall shellexec
