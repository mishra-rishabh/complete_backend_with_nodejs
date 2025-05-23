FROM node:20-alpine3.20

WORKDIR /app

# COPY package.json .
# COPY package-lock.json .
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

# or expose multiple ports
# EXPOSE 8000 3000 3001

# or expose ports in a given range
# EXPOSE 3000-3005

CMD [ "npm", "start" ]
