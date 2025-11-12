@echo off
setlocal enabledelayedexpansion
REM LearnMappers Server - Windows Auto-Heal Monitor
REM Monitors server process and automatically restarts on crash or restart flag

set PROJECT_PATH=%~1
set SITE_DIR=%~2
set SERVER_LOG=%PROJECT_PATH%\server.log
set RESTART_FLAG=%PROJECT_PATH%\.restart-flag
set PID_FILE=%PROJECT_PATH%\.server-pid

cd /d "%PROJECT_PATH%"

REM Detect package manager
where pnpm >nul 2>&1
if %errorlevel% == 0 (
    set PKG_MGR=pnpm
) else (
    where uv >nul 2>&1
    if %errorlevel% == 0 (
        set PKG_MGR=uv run
    ) else (
        set PKG_MGR=npm
    )
)

:loop
timeout /t 2 /nobreak >nul

REM Check for restart flag
if exist "%RESTART_FLAG%" (
    echo 🔄 Restart flag detected, restarting server... >> "%SERVER_LOG%"
    
    REM Read current PID if exists
    if exist "%PID_FILE%" (
        set /p CURRENT_PID=<"%PID_FILE%"
        taskkill /PID !CURRENT_PID! /F >nul 2>&1
        timeout /t 1 /nobreak >nul
    )
    
    REM Remove restart flag
    del /f /q "%RESTART_FLAG%" >nul 2>&1
    
    REM Start new server process
    start /b "" cmd /c "set SITE_DIR=%SITE_DIR% && %PKG_MGR% start >> %SERVER_LOG% 2>&1"
    
    REM Get PID of the last started process (Node.js)
    for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO LIST ^| findstr /I "PID"') do set NEW_PID=%%a
    echo !NEW_PID! > "%PID_FILE%"
    
    echo ✅ Server restarted (PID: !NEW_PID!) >> "%SERVER_LOG%"
    goto :loop
)

REM Check if server process is still running
if exist "%PID_FILE%" (
    set /p CURRENT_PID=<"%PID_FILE%"
    
    REM Check if process is running
    tasklist /FI "PID eq !CURRENT_PID!" 2>nul | find /I "node.exe" >nul
    if errorlevel 1 (
        REM Process died, auto-heal
        echo ⚠️  Server process died, auto-healing... >> "%SERVER_LOG%"
        
        REM Start new server process
        start /b "" cmd /c "set SITE_DIR=%SITE_DIR% && %PKG_MGR% start >> %SERVER_LOG% 2>&1"
        
        REM Get PID of the last started process
        for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO LIST ^| findstr /I "PID"') do set NEW_PID=%%a
        echo !NEW_PID! > "%PID_FILE%"
        
        echo ✅ Server auto-healed (PID: !NEW_PID!) >> "%SERVER_LOG%"
    )
) else (
    REM No PID file, start server
    echo 🚀 Starting server (no PID file found)... >> "%SERVER_LOG%"
    
    start /b "" cmd /c "set SITE_DIR=%SITE_DIR% && %PKG_MGR% start >> %SERVER_LOG% 2>&1"
    
    REM Get PID of the last started process
    for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO LIST ^| findstr /I "PID"') do set NEW_PID=%%a
    echo !NEW_PID! > "%PID_FILE%"
    
    echo ✅ Server started (PID: !NEW_PID!) >> "%SERVER_LOG%"
)

goto :loop

