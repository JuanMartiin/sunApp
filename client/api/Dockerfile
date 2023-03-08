FROM node 

WORKDIR /app
COPY ./api ./api
COPY ./package*.json .
RUN npm install

CMD [ "node",  "/app/api/auxserver.js"]