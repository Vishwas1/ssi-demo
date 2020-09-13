FROM node:12

COPY .env .env
RUN source .env

WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
ADD . /usr/src/app

RUN npm run build
RUN npm run start -- --newdb

EXPOSE $PORT
CMD ["npm", "run", "start" ]

