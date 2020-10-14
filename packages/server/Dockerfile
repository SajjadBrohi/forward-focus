FROM node

RUN mkdir -p /packages/server
WORKDIR /packages/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node" , "index.js"]