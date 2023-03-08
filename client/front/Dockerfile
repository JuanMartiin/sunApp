FROM node

WORKDIR /app
COPY ./front ./front
COPY ./package*.json .
RUN npm install
EXPOSE 3000

CMD [ "node", "/app/front/server.js" ]