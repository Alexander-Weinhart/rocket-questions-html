$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$PythonCmd = Get-Command py -ErrorAction SilentlyContinue
if (-not $PythonCmd) {
    $PythonCmd = Get-Command python -ErrorAction SilentlyContinue
}

if (-not $PythonCmd) {
    Write-Host "Python not found. Attempting install via winget..."
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if (-not $winget) {
        throw "winget is not available. Install App Installer from Microsoft Store, then rerun setup."
    }
    winget install --id Python.Python.3.12 --accept-package-agreements --accept-source-agreements --silent
    Start-Sleep -Seconds 3
}

# Resolve command again after possible install
$PyLauncher = Get-Command py -ErrorAction SilentlyContinue
if ($PyLauncher) {
    $PythonExe = "py"
    $PythonArgs = @("-3")
} else {
    $PythonExe = "python"
    $PythonArgs = @()
}

$venvPath = Join-Path $ProjectRoot ".venv"
if (-not (Test-Path $venvPath)) {
    & $PythonExe @PythonArgs -m venv $venvPath
}

$pipExe = Join-Path $venvPath "Scripts\\pip.exe"
$pythonVenv = Join-Path $venvPath "Scripts\\python.exe"

& $pipExe install --upgrade pip
& $pipExe install -r (Join-Path $ProjectRoot "requirements.txt")

Write-Host "Dependencies installed."

$appScript = Join-Path $ProjectRoot "netc_pop_quiz.py"
if (Test-Path $appScript) {
    Write-Host "Launching rocket-questions..."
    Start-Process -FilePath $pythonVenv -ArgumentList @("$appScript")
}
