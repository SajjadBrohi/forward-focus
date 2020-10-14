FROM node

RUN mkdir -p /packages/client
WORKDIR /packages/client

COPY package*.json ./

RUN npm install

RUN npm install -g create-react-app

COPY . .

EXPOSE 3000

CMD [ "npm" , "start"]