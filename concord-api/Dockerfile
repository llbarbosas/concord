FROM node:14.1-alpine

RUN apk add --update-cache python

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"] 
