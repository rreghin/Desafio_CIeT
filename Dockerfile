FROM node:14
USER root
COPY entrypoint.sh /run/entrypoint.sh
RUN npm install typescript --global ; \
    chmod +x /run/entrypoint.sh
WORKDIR /home/app
CMD [ "/run/entrypoint.sh" ]
