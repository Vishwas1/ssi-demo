## Server

```bash
cd server
npm i
mv .env.sample .env // rename remove .sample from  .env.sample
npm run setup // to setup env and database
npm run start  // to run the server
npm run dev // to run the server in dev env
```

The server runs on port `5000`. Please look into `.env` file to change paramaters. 

## Docker

### Building the image

```bash
docker build -t hypersignprotocol/core:1.0.0 .
```

### Running the container

```bash
docker run -p 8000:8000 hypersignprotocol/core:1.0.0
```

### Running with custom env var

```bash
docker run --env \ 
    PORT=5000 \
    LOG_FILEPATH="../log/jwt-demo.log" \
    LOG_DIR="./log" \
    LOG_TIMESTAMP_FORMAT="YYYY-MM-DD HH:mm:ss.SSS" \
    LOG_LEVEL="debug" \
    DATABASE_FILEPATH="../db/app.db" \
    DID_METHOD_NAME='hs' \ 
    DID_PREFIX="did" \
    JWT_SECRET="my\$ecreEtKeY@123" \
    -p 5000:5000 hypersignprotocol/core:1.0.0
```

The server should run on port `:5000`

## APIs

- `api/auth/register`: To register a user
- `api/auth/login`: Tp authenticate a user
- `api/auth/verify`: Verifies the authToken passed in header for client
- `api/auth/challenge`: To get a new challenge
- `api/blog/created`: Protected with JSON web token

