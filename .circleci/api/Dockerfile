FROM node:13.3-alpine

WORKDIR /home/docker-api
RUN chown -R node:node /home/docker-api
USER node

COPY package.json ./
COPY server.js ./
COPY apiRouter.js ./
COPY routes ./
COPY models ./
COPY migrations ./
COPY config ./

RUN npm install

EXPOSE 8181
ENTRYPOINT ["npm", "start"]