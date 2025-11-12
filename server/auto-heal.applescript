#!/usr/bin/osascript
-- LearnMappers Server - AppleScript Auto-Heal Monitor
-- Monitors server process and automatically restarts on crash or restart flag

on run argv
	set projectPath to item 1 of argv
	set siteDir to item 2 of argv
	set serverLog to projectPath & "/server.log"
	set restartFlag to projectPath & "/.restart-flag"
	set pidFile to projectPath & "/.server-pid"
	
	-- Change to project directory
	do shell script "cd " & quoted form of projectPath
	
	repeat
		try
			-- Check for restart flag
			set flagExists to do shell script "test -f " & quoted form of restartFlag & " && echo 'yes' || echo 'no'"
			
			if flagExists is "yes" then
				-- Restart flag detected
				do shell script "echo '🔄 Restart flag detected, restarting server...' >> " & quoted form of serverLog
				
				-- Read current PID if exists
				set currentPID to ""
				try
					set currentPID to do shell script "cat " & quoted form of pidFile
					-- Kill existing process
					do shell script "kill " & currentPID & " 2>/dev/null || true"
					delay 1
				end try
				
				-- Remove restart flag
				do shell script "rm -f " & quoted form of restartFlag
				
				-- Detect package manager (npm, pnpm, or uv)
				set pkgMgr to "npm"
				try
					set pnpmCheck to do shell script "which pnpm 2>/dev/null && echo 'pnpm' || echo ''"
					if pnpmCheck is "pnpm" then
						set pkgMgr to "pnpm"
					else
						set uvCheck to do shell script "which uv 2>/dev/null && echo 'uv' || echo ''"
						if uvCheck is "uv" then
							set pkgMgr to "uv run"
						end if
					end if
				end try
				
				-- Start new server process and capture PID
				set startCmd to "cd " & quoted form of projectPath & " && (nohup env SITE_DIR=" & quoted form of siteDir & " " & pkgMgr & " start >> " & quoted form of serverLog & " 2>&1 & echo $!)"
				set newPID to do shell script startCmd
				
				-- Save PID
				do shell script "echo " & newPID & " > " & quoted form of pidFile
				
				do shell script "echo '✅ Server restarted (PID: " & newPID & ")' >> " & quoted form of serverLog
			else
				-- Check if server process is still running
				set pidExists to do shell script "test -f " & quoted form of pidFile & " && echo 'yes' || echo 'no'"
				
				if pidExists is "yes" then
					set currentPID to do shell script "cat " & quoted form of pidFile
					
					-- Check if process is running
					set processRunning to do shell script "kill -0 " & currentPID & " 2>/dev/null && echo 'yes' || echo 'no'"
					
					if processRunning is "no" then
						-- Process died, auto-heal
						do shell script "echo '⚠️  Server process died, auto-healing...' >> " & quoted form of serverLog
						
					-- Detect package manager (npm, pnpm, or uv)
					set pkgMgr to "npm"
					try
						set pnpmCheck to do shell script "which pnpm 2>/dev/null && echo 'pnpm' || echo ''"
						if pnpmCheck is "pnpm" then
							set pkgMgr to "pnpm"
						else
							set uvCheck to do shell script "which uv 2>/dev/null && echo 'uv' || echo ''"
							if uvCheck is "uv" then
								set pkgMgr to "uv run"
							end if
						end if
					end try
					
					-- Start new server process and capture PID
					set startCmd to "cd " & quoted form of projectPath & " && (nohup env SITE_DIR=" & quoted form of siteDir & " " & pkgMgr & " start >> " & quoted form of serverLog & " 2>&1 & echo $!)"
					set newPID to do shell script startCmd
						
						-- Save PID
						do shell script "echo " & newPID & " > " & quoted form of pidFile
						
						do shell script "echo '✅ Server auto-healed (PID: " & newPID & ")' >> " & quoted form of serverLog
					end if
				else
				-- No PID file, start server
				do shell script "echo '🚀 Starting server (no PID file found)...' >> " & quoted form of serverLog
				
				-- Detect package manager (npm, pnpm, or uv)
				set pkgMgr to "npm"
				try
					set pnpmCheck to do shell script "which pnpm 2>/dev/null && echo 'pnpm' || echo ''"
					if pnpmCheck is "pnpm" then
						set pkgMgr to "pnpm"
					else
						set uvCheck to do shell script "which uv 2>/dev/null && echo 'uv' || echo ''"
						if uvCheck is "uv" then
							set pkgMgr to "uv run"
						end if
					end if
				end try
				
				-- Start new server process and capture PID
				set startCmd to "cd " & quoted form of projectPath & " && (nohup env SITE_DIR=" & quoted form of siteDir & " " & pkgMgr & " start >> " & quoted form of serverLog & " 2>&1 & echo $!)"
				set newPID to do shell script startCmd
					
					-- Save PID
					do shell script "echo " & newPID & " > " & quoted form of pidFile
					
					do shell script "echo '✅ Server started (PID: " & newPID & ")' >> " & quoted form of serverLog
				end if
			end if
		on error errMsg
			-- Log error but continue monitoring
			do shell script "echo '❌ Auto-heal error: " & errMsg & "' >> " & quoted form of serverLog
		end try
		
		-- Wait 3 seconds before next check
		delay 3
	end repeat
end run

