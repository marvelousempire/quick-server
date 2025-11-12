@echo off
REM Start Windows Auto-Heal Monitor

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set AUTO_HEAL_SCRIPT=%SCRIPT_DIR%auto-heal-windows.bat

REM Get site directory from environment or default
if "%SITE_DIR%"=="" set SITE_DIR=sites\learnmappers

REM Check if auto-heal is already running
tasklist /FI "IMAGENAME eq cmd.exe" /FO CSV | findstr /I "auto-heal-windows" >nul
if %errorlevel% == 0 (
    echo ⚠️  Auto-heal monitor is already running
    exit /b 0
)

REM Start monitor in background
echo 🚀 Starting Windows Auto-Heal Monitor...
start /b "" cmd /c "%AUTO_HEAL_SCRIPT%" "%PROJECT_DIR%" "%SITE_DIR%"

REM Get PID
for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq cmd.exe" /FO LIST ^| findstr /I "PID"') do set AUTO_HEAL_PID=%%a
echo %AUTO_HEAL_PID% > "%PROJECT_DIR%\.auto-heal-pid"

echo.
echo 📋 Auto-Heal Monitor Status:
echo    OS: Windows
echo    PID: %AUTO_HEAL_PID%
echo    Log: %PROJECT_DIR%\server.log
echo    PID File: %PROJECT_DIR%\.server-pid
echo.
echo 💡 To stop: taskkill /PID %AUTO_HEAL_PID% /F
echo 💡 Or: .\server\stop-auto-heal.bat

