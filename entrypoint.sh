#!/bin/bash
if [[ ! -d /home/app/node_modules ]]
then
    cd /home/app
    npm install
fi
/bin/bash
