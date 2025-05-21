FROM node:20-alpine3.20

WORKDIR /app

# COPY package.json .
# COPY package-lock.json .
COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]
