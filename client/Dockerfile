FROM node:17-alpine

WORKDIR /app

COPY package.json .
ENV CHOKIDAR_USEPOLLING=true
ENV npm_config_cache=/tmp/npm/
RUN sudo npm cache clean --force
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

