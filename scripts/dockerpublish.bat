@ECHO OFF
ECHO "Starting docker build & publish script"

:: Get script dir
pushd %~dp0
set SCRIPTDIR=%CD%
popd

:: Args
SET IMGNAME="ryandev/netspeed"
SET TAGVER="latest"
SET DOCKERDIR=%SCRIPTDIR%\..

:: Run 
@REM Requires experimental flag of Docker daemon enabled for buildx to work
ECHO "Building docker image"
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t %IMGNAME%:%TAGVER% --push %DOCKERDIR%
@REM If this returns with an error, follow the instruction 'docker buildx create --use' & rerun
IF %ERRORLEVEL% NEQ 0 EXIT 1

echo "Published new build for arch arm7/arm64 & amd64"