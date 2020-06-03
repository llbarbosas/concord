FROM node:14.1-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3030

CMD ["yarn", "start"] 
