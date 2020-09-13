FROM node:12

WORKDIR /usr/src/app
COPY .env .
RUN /bin/bash -c "source /usr/src/app/.env"

# ENV NODE_ENV=development \
#     PORT=5000 \
#     LOG_DIR='./log' \
#     LOG_FILEPATH='../log/jwt-demo.log' \
#     LOG_TIMESTAMP_FORMAT='YYYY-MM-DD HH:mm:ss.SSS' \
#     LOG_LEVEL='info' \
#     DATABASE_FILEPATH='../db/app.db' \
#     DID_METHOD_NAME='hs' \
#     DID_PREFIX='did' \
#     JWT_SECRET='my\$ecreEtKeY@123' 

COPY package.json .
COPY package-lock.json .
RUN npm install
ADD . /usr/src/app

RUN npm run build
RUN npm run start -- --newdb

EXPOSE $PORT
CMD ["npm", "run", "start" ]

