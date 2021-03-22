FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install --only=prod

COPY ./dist .
COPY .env .

EXPOSE 6001

CMD ["node", "index.js"]