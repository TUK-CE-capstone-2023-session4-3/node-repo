FROM node:16

WORKDIR /capNode

RUN yarn

COPY . .

COPY package*.json ./

EXPOSE 8080

CMD [ "node", "sms.cjs" ]


