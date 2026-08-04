$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
$f   = Join-Path $dir 'POS.html'
if (-not (Test-Path $f)) { Write-Host 'POS.html 을 찾을 수 없습니다.'; Start-Sleep 4; exit }
$u = [uri]::EscapeUriString('file:///' + ($f -replace '\\','/'))
$cands = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LocalAppData\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)
$b = $cands | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($b) { Start-Process $b -ArgumentList "--app=$u","--window-size=1360,900" }
else    { Start-Process $f }