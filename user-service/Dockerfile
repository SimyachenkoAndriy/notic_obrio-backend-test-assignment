FROM node:20.16.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1111

CMD ["yarn", "run", "start"]
