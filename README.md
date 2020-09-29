## Server

```bash
cd server
npm i
npm run setup // to setup env and database
npm run start  // to run the server
npm run dev // to run the server in dev env
```

The server runs on port `5000`. Please look into `.env` file to change paramaters. 

### Docker

#### Pull the image

```bash
docker pull hypersignprotocol/core:<tag>
```

#### Building the image

```bash
docker build -t hypersignprotocol/core:test .
```

#### Running the container

```bash
docker run \
    --env PORT=5000 \
    --env LOG_FILEPATH="../log/core.log" \
    --env LOG_DIR="./log" \
    --env LOG_TIMESTAMP_FORMAT="YYYY-MM-DD HH:mm:ss.SSS" \
    --env LOG_LEVEL="debug" \
    --env DATABASE_FILEPATH="../db/core.db" \
    --env JWT_SECRET="my\$ecreEtKeY@123" \
    -p 5000:5000 hypersignprotocol/core
```


