#!/bin/bash 

echo Enter Version
read VERSION
echo $VERSION

docker build -t m3ghdad/border-radius:$VERSION .
docker push m3ghdad/border-radius:$VERSION
ssh root@206.189.185.54 "docker pull m3ghdad/border-radius:$VERSION && docker tag m3ghdad/border-radius:$VERSION dokku/api:latest && dokku deploy api latest"

