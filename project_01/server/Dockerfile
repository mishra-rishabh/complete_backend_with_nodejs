FROM node:20.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm run dev" ]
# or
# CMD [ "nodemon", "app.js" ]