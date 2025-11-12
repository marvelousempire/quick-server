@echo off
REM Stop Windows Auto-Heal Monitor

set SCRIPT_DIR=%~dp0
set PROJECT_DIR=%SCRIPT_DIR%..
set PID_FILE=%PROJECT_DIR%\.auto-heal-pid

if exist "%PID_FILE%" (
    set /p AUTO_HEAL_PID=<"%PID_FILE%"
    
    tasklist /FI "PID eq %AUTO_HEAL_PID%" 2>nul | find /I "cmd.exe" >nul
    if %errorlevel% == 0 (
        echo 🛑 Stopping auto-heal monitor (PID: %AUTO_HEAL_PID%)...
        taskkill /PID %AUTO_HEAL_PID% /F >nul 2>&1
        
        REM Also kill any remaining monitor processes
        taskkill /FI "WINDOWTITLE eq auto-heal-windows*" /F >nul 2>&1
        
        del /f /q "%PID_FILE%" >nul 2>&1
        echo ✅ Auto-heal monitor stopped
    ) else (
        echo ⚠️  Auto-heal monitor process not found
        del /f /q "%PID_FILE%" >nul 2>&1
    )
) else (
    REM Try to find and kill by process name
    tasklist /FI "IMAGENAME eq cmd.exe" /FO CSV | findstr /I "auto-heal-windows" >nul
    if %errorlevel% == 0 (
        echo 🛑 Stopping auto-heal monitor...
        taskkill /FI "WINDOWTITLE eq auto-heal-windows*" /F >nul 2>&1
        echo ✅ Auto-heal monitor stopped
    ) else (
        echo ℹ️  Auto-heal monitor is not running
    )
)

