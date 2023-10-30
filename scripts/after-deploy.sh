#!/bin/bash
REPOSITORY=/home/build/lolink_back

cd $REPOSITORY

sudo yarn install
sudo yarn start:dev