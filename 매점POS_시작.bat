@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 매점 POS 시작 중... 브라우저가 열립니다.
start "" http://localhost:8080
set PY="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
if exist %PY% (
  %PY% -m http.server 8080 --bind 127.0.0.1
) else (
  python -m http.server 8080 --bind 127.0.0.1
)
