FROM node:18-alphine

WORKDIR /capNode

COPY . .

COPY package*.json ./

RUN yarn

EXPOSE 8080

CMD [ "node", "sms.cjs" ]


