FROM node:18

WORKDIR /recipe-storing-website

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","index.js"]



