FROM node:18-buster

WORKDIR /client

COPY . .

RUN npm install

EXPOSE 3000

RUN npm i react-scripts

CMD ["npm", "start"]
