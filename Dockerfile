FROM node:17.2.0-alpine3.12 AS dtapp

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn --prod

COPY ./dist ./dist

EXPOSE 8080
CMD ["node", "dist/index.js"]
