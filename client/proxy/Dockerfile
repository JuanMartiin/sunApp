FROM node 

WORKDIR /app

COPY ./proxy ./proxy
COPY ./package*.json .
RUN npm install

CMD [ "node", "/app/proxy/proxy.js" ]