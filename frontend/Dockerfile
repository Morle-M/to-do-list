FROM node:16

WORKDIR /src
ARG API_URL
ENV API_URL ${API_URL:-http://localhost:3000}
COPY rollup.config.js ./
COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY . .

RUN npm run build

EXPOSE 8080

ENV HOST=0.0.0.0

CMD [ "npm", "start" ]
