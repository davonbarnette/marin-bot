FROM node:16

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "index.js"]