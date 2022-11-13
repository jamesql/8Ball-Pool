@echo off
title Building Scripts
echo [Build] Compiling Client WebSocket.....
tsc ./src/scripts/client.ts --esModuleInterop --outDir ./src/web/public/scripts

pause