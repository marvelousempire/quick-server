@echo off
REM LearnMappers PWA - Auto-Fit, Auto-Born, Auto-Heal Startup Script (Windows)

cd /d "%~dp0"

REM Detect available sites
set SITE_COUNT=0
set SITE_LIST=
if exist "sites" (
    for /d %%d in (sites\*) do (
        set "site_name=%%~nxd"
        if not "!site_name!"=="!site_name:.=!" (
            REM Skip 'default' folder (it's the selector, not a site)
            if "!site_name!"=="default" goto :skip_default
            if exist "sites\!site_name!\pages\index.html" (
                set /a SITE_COUNT+=1
                set "SITE_LIST=!SITE_LIST! !site_name!"
            ) else if exist "sites\!site_name!\index.html" (
                set /a SITE_COUNT+=1
                set "SITE_LIST=!SITE_LIST! !site_name!"
            )
            :skip_default
        )
    )
)

REM Site selection
set SITE_DIR=%SITE_DIR%
if "%SITE_DIR%"=="" (
    if %SITE_COUNT% GTR 1 (
        echo.
        echo 🚀 LearnMappers PWA - Auto Startup
        echo ====================================
        echo.
        echo Multiple sites detected:
        set idx=1
        for %%s in (%SITE_LIST%) do (
            set "site=%%s"
            set "marker="
            if "!site!"=="learnmappers" set "marker= (default)"
            echo   !idx!. !site!!marker!
            set /a idx+=1
        )
        echo.
        set /p site_choice="Select site number (1-%SITE_COUNT%) or press Enter for default: "
        if not "!site_choice!"=="" (
            set idx=1
            for %%s in (%SITE_LIST%) do (
                if !idx!==!site_choice! (
                    set "SITE_DIR=sites\%%s"
                    goto :site_selected
                )
                set /a idx+=1
            )
        )
        :site_selected
        if "%SITE_DIR%"=="" set SITE_DIR=sites\learnmappers
    ) else (
        set SITE_DIR=sites\learnmappers
    )
)

echo.
echo 🚀 LearnMappers PWA - Auto Startup
echo ====================================
echo Site:    %SITE_DIR%
echo.

REM Auto-Fit: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    echo.
    echo 💡 Install Node.js:
    echo    - Download: https://nodejs.org/
    echo    - Or use: winget install OpenJS.NodeJS
    echo    - Or use: choco install nodejs
    echo.
    pause
    exit /b 1
)

echo ✓ Node.js found
where pnpm >nul 2>&1
if %errorlevel% equ 0 (
    set PKG_MGR=pnpm
    echo ✓ pnpm found
) else (
    where npm >nul 2>&1
    if %errorlevel% equ 0 (
        set PKG_MGR=npm
        echo ⚠ Using npm (pnpm recommended)
        echo.
        set /p INSTALL_PNPM="Install pnpm? (y/N): "
        if /i "!INSTALL_PNPM!"=="y" (
            npm install -g pnpm
            set PKG_MGR=pnpm
            echo ✓ pnpm installed
        )
    ) else (
        echo ❌ No package manager found
        echo 💡 Install npm (comes with Node.js) or pnpm
        pause
        exit /b 1
    )
)

REM Check Python (optional)
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python found
) else (
    echo ⚠ Python not found (optional - for Python servers)
)

REM Check UV (optional)
where uv >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ UV found
) else (
    echo ⚠ UV not found (optional - for Python package management)
    echo 💡 Install: pip install uv or pipx install uv
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📥 Installing dependencies...
    %PKG_MGR% install
) else (
    echo ✓ Dependencies installed
)

REM Auto-Born: Initialize database
echo.
echo 🌱 Auto-Born: Initializing database...
if not exist "data" mkdir data

if not exist "data\learnmappers.db" (
    echo 📊 Creating database...
    %PKG_MGR% run init-db
    if %errorlevel% neq 0 (
        node scripts\init-db.js
    )
) else (
    echo ✓ Database exists
)

REM Auto-Heal: Start server
echo.
echo 🎯 Starting server...
echo ====================================
echo.

REM Start server in background
if not "%SITE_DIR%"=="sites\learnmappers" (
    echo 📁 Serving site from: %SITE_DIR%
    set SITE_DIR=%SITE_DIR%
    start /B %PKG_MGR% start
) else (
    start /B %PKG_MGR% start
)

REM Wait a moment for server to start
timeout /t 2 /nobreak >nul

REM Open in private browser window
echo.
echo 🌐 Opening in private browser window...
echo.

REM Try Chrome first
where chrome.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" chrome.exe --incognito "http://localhost:%HTTP_PORT%"
    goto :browser_opened
)

REM Try Edge
where msedge.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" msedge.exe --inprivate "http://localhost:%HTTP_PORT%"
    goto :browser_opened
)

REM Try Firefox
where firefox.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" firefox.exe --private-window "http://localhost:%HTTP_PORT%"
    goto :browser_opened
)

REM Fallback: default browser
start "" "http://localhost:%HTTP_PORT%"

:browser_opened

REM Keep script running (wait for server)
:wait_loop
timeout /t 1 /nobreak >nul
goto :wait_loop

pause

