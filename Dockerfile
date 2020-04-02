FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY ./backend /app
RUN yarn install

EXPOSE 3333
