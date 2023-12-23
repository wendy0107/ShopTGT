FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY server.js ./
COPY .env ./

EXPOSE 3000

CMD ["node", "server.js"]