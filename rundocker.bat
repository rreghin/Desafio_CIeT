@echo off
docker build -t desafio_ciet .
docker run -ti --rm --name TS-DEV -v ${PWD}:/home/app desafio_ciet
