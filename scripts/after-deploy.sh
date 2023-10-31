#!/bin/bash
REPOSITORY=/home/ubuntu/build/lolink_back

cd $REPOSITORY

sudo yarn
sudo pm2 delete all
sudo pm2 start dist/src/main.js