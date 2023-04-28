FROM node:16-alpine


WORKDIR /app

COPY package.json .
ENV CHOKIDAR_USEPOLLING=true
ENV npm_config_cache=/tmp/npm/
RUN sudo npm cache clean --force 
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
