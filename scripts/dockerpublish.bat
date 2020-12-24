@ECHO OFF
ECHO "Starting docker build & publish script"

:: Get script dir
pushd %~dp0
set SCRIPTDIR=%CD%
popd

:: Args
SET IMGNAME="ryandev/netspeed"
SET TAGVER="1.1"
SET DOCKERDIR=%SCRIPTDIR%\..

:: Run
ECHO "Building docker image"
docker build -t %IMGNAME%:%TAGVER% %DOCKERDIR%
IF %ERRORLEVEL% NEQ 0 EXIT 1

echo "Publishing new build"
docker tag %IMGNAME%:%TAGVER% %IMGNAME%:latest
docker push %IMGNAME%:latest
