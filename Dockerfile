FROM python:3.13.0a4-slim-bookworm
ENV PYTHONPATH "${PYTHONPATH}:/home/python/"
FROM node:18-buster-slim
# RUN apt-get update && apt-get install -y curl
WORKDIR /app/tutoree/

# RUN npm config set python /home/python/

COPY package.json /app/tutoree/
RUN npm install

COPY . /app/tutoree/
COPY .env /app/tutoree/

RUN npm run migrate
RUN npm run seed

CMD ["npm", "start"]