FROM strapi/base:14

WORKDIR /usr/app/strapi

COPY ./package.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
