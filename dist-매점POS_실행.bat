@echo off
rem POS launcher - URL-encodes path via PowerShell so Korean folder names work
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0launch.ps1"
exit