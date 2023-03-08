FROM node

WORKDIR /app
COPY ./node ./node
COPY ./package*.json .
RUN npm install

CMD ["node", "/app/node/index.js"]