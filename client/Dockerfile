FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install
ENV CHOKIDAR_USEPOLLING=true
ENV npm_config_cache=/tmp/npm/
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

