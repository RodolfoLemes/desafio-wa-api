FROM node:lts

WORKDIR /usr/desafio-wa-api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run typeorm migration:run

EXPOSE 3333:3333

CMD npm run dev:server
