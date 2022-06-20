#!/bin/bash

echo "<---- Setting environmental variables ---->"

go mod tidy

echo "Building binaries"

./scripts/build_binaries.sh

echo "<---- Starting Up Docker Containers ---->"

cd ./deployments
docker-compose up --build --remove-orphans --force-recreate
docker-compose down
docker image prune -f
