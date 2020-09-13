## Server

```bash
cd server
npm i
mv .env.sample .env // rename remove .sample from  .env.sample
npm run build // to build
npm run start -- --newdb // to setup the database
npm run start  // to run the server
npm run dev // to run the server in dev env
```

The server runs on port `5000`. Please look into `.env` file to change paramaters. 
## Docker

```bash
docker build -t hypersignprotocol/core .
```
## APIs

- `api/auth/register`: To register a user
- `api/auth/login`: Tp authenticate a user
- `api/auth/verify`: Verifies the authToken passed in header for client
- `api/auth/challenge`: To get a new challenge
- `api/blog/created`: Protected with JSON web token

