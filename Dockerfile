FROM node:16 as builder

ENV NODE_ENV dev

RUN mkdir /usr/app

WORKDIR /usr/app

COPY . .

RUN npm i && npm run build

FROM node:16

ENV NODE_ENV production

WORKDIR /usr/app

COPY package*.json ./

ENV HTTP_PORT 3099

RUN npm ci 

COPY --from=builder /usr/app/dist /usr/app

EXPOSE 3099

CMD ["npm", "start"]