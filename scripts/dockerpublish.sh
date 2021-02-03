#!/bin/bash
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Starting docker build & publish script"

#Args
IMGNAME="ryandev/netspeed"
TAGVER="latest"
DOCKERDIR=$SCRIPTDIR/..

#Build
#Requires experimental flag of Docker daemon enabled for buildx to work
echo "Building docker image"

docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t $IMGNAME:$TAGVER --push $DOCKERDIR
EXITSTATUS=$?

if [[ $EXITSTATUS -ne 0 ]]; then
    echo "Published new build for arch arm7/arm64 & amd64"
fi

exit $EXITSTATUS
