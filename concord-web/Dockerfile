FROM node:14.1-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"] 
