FROM node:14
RUN npm install typescript --global
WORKDIR /home/app
#VOLUME /home/app
ENTRYPOINT ["/bin/bash"]
