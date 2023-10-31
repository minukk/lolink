#!/bin/bash
REPOSITORY=/home/ubuntu/build/lolink_back

cd $REPOSITORY
export NODE_ENV=dev

sudo yarn
sudo pm2 kill
sudo -E yarn start:dev