# Imagen base
FROM node:22-slim

USER root

RUN apt-get update && apt-get install -y tzdata

ENV TZ=America/Bogota
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install -g typescript

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV AMBIENTE_APP produccion

CMD ["npm", "run", "start"]
