@echo off
echo === Preparando o app mundo calmo para Android Studio ===
call npm install
if errorlevel 1 goto erro
call npm run build
if errorlevel 1 goto erro
call npm install @capacitor/core @capacitor/cli @capacitor/android
if errorlevel 1 goto erro
if not exist "android" (
  call npx cap add android
) else (
  call npx cap sync android
)
if errorlevel 1 goto erro
echo === Abrindo Android Studio... ===
call npx cap open android
goto fim

:erro
echo Ocorreu um erro. Verifique se o Node.js e o Android Studio estao instalados.
pause

:fim
