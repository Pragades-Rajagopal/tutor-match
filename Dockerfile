FROM node:21-alpine3.18
WORKDIR /app/tutoree/

COPY package.json /app/tutoree/
RUN npm install

COPY . /app/tutoree/
COPY .env /app/tutoree/

RUN npm run migrate
RUN npm run seed

CMD ["npm", "start"]