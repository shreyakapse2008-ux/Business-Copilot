# BusinessCopilot Backend Starter
# Kills old processes first, then starts fresh

Write-Host "Stopping old Python processes..." -ForegroundColor Yellow
Get-Process -Name "python*" -ErrorAction SilentlyContinue | Stop-Process -Force

Start-Sleep -Seconds 2

Write-Host "Starting Backend on http://127.0.0.1:8000 ..." -ForegroundColor Green

Set-Location "$PSScriptRoot\BusinessCopilot\backend"
.\venv\Scripts\python.exe -m uvicorn main:app --port 8000 --reload
