@echo off
cd /d "%~dp0"
echo Valeria · servidor local
echo Abre http://127.0.0.1:8092/
py -m http.server 8092 2>nul
if errorlevel 1 python -m http.server 8092
