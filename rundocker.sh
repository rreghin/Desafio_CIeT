#!/bin/bash
docker build -t desafio_ciet .
docker run -ti --rm --name TS-DEV -v ${PWD}:/home/app --restart=unless-stopped desafio_ciet
