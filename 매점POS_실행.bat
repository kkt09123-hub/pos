@echo off
chcp 65001 >nul
title 매점 POS
cd /d "%~dp0"

rem 크롬을 '앱 모드'로 실행 = 주소창 없는 프로그램 창처럼 열림 (인터넷 불필요)
set "APP=%~dp0매점POS.html"

set "CHROME="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

set "EDGE="
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if defined CHROME (
  start "" "%CHROME%" --app="file:///%APP:\=/%"
) else if defined EDGE (
  start "" "%EDGE%" --app="file:///%APP:\=/%"
) else (
  rem 크롬/엣지가 없으면 기본 브라우저로
  start "" "%APP%"
)
exit
