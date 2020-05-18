FROM node:14.1-alpine

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

# iniciando o serviço manualmente por causa do Prisma
# npx prisma introspect
# npx prisma generate  
ENTRYPOINT ["tail", "-f", "/dev/null"] 
