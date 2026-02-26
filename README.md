# rocket-questions

Practice quiz app for NETC-121 with week-by-week question banks, history tracking, and dynamic filtering.

## Runtime Dependencies
- OS:
  - Windows 10 or Windows 11 (for setup `.exe` flow)
  - Linux/macOS supported for source run
- Python:
  - Python 3.11+ (Tkinter included)
- Python packages:
  - No third-party runtime dependencies required (standard library only)

## Project Files
- `netc_pop_quiz.py`: main app
- `week1_question_bank.csv` ... `week6_question_bank.csv`: week-specific banks
- `question_bank.csv`: fallback combined bank
- `changes.csv`: ineffective question change requests
- `question_history.csv`: correct/incorrect history log
- `rocket_icon.png`: app icon

## Run From Source
```bash
python3 netc_pop_quiz.py
```

## Windows Setup EXE (Build + Install)
This repo includes an Inno Setup installer definition that builds `RocketQuestionsSetup.exe`.

### What the setup EXE does
- Installs app files into `%LOCALAPPDATA%\\RocketQuestions`.
- Runs `windows/install_dependencies.ps1` after install.
- Bootstraps Python 3.12 via `winget` if Python is missing.
- Creates/updates local venv and installs `requirements.txt`.
- Optionally launches the app.

## Build Setup EXE Locally on Windows
1. Install Inno Setup 6.
2. Open `windows/RocketQuestionsSetup.iss` in Inno Setup Compiler.
3. Build to produce `RocketQuestionsSetup.exe`.

## GitHub Actions Build (Automatic)
On push to `main`, workflow `.github/workflows/build-windows-setup.yml` builds and uploads:
- `RocketQuestionsSetup.exe`

Download from:
- GitHub Actions run artifacts.

## Notes
- `requirements.txt` is intentionally minimal because the app uses Python standard library modules.
- The installer targets Windows 10/11 and uses `winget` for dependency bootstrap when needed.
