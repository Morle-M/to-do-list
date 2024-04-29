FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV DBUSER=postgres
ENV DBHOST=database
ENV DBDATABASE=postgres
ENV DBPORT=5432

CMD ["node", "server.js"]
