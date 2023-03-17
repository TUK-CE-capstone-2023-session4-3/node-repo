FROM node:16

WORKDIR /capNode



COPY . ./

COPY package*.json ./


RUN yarn

EXPOSE 8080

CMD [ "node", "sms.cjs" ]


