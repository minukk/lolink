#!/bin/bash
REPOSITORY=/home/ubuntu/build/lolink_back

cd $REPOSITORY

sudo yarn
sudo pm2 reload all