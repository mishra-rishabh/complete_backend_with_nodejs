FROM node:20.14.0-alpine

WORKDIR /app

COPY package*.json ./

# ci means clean install
RUN npm ci

COPY . .

EXPOSE 5173

CMD [ "npm run dev" ]