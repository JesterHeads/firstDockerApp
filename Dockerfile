FROM node:14-alpine

EXPOSE 3000

RUN mkdir -p /home/app

COPY ./app /home/app

WORKDIR /home/app

RUN npm install

CMD node server.js