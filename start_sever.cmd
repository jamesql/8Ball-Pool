@echo off
cls
title Console
echo [Pre-Launch] Building Scripts.....
start cmd.exe /c build.cmd
echo [Launch] Launching.....
ts-node ./
echo [Exit] Closing.....
pause