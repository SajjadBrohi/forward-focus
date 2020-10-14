FROM node

RUN mkdir -p /packages/client
WORKDIR /packages/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" , "start"]