FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3250

ENV DB_USER=pedro

ENV DB_PASS=Shong777

CMD [ "npm", "start" ]