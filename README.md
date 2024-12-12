# TofAi Pravtice Telegram bot with MiniApp

## Back-end Libraries

- "apexify": "^4.2.8",
- "assemblyai": "^4.7.1",
- "axios": "^1.7.7",
- "body-parser": "^1.20.3",
- "cheerio": "^1.0.0",
- "concurrently": "^9.0.1",
- "cookie-parser": "^1.4.7",
- "cors": "^2.8.5",
- "crypto-js": "^4.2.0",
- "dotenv": "^16.4.5",
- "express": "^4.21.0",
- "mongoose": "^8.7.0",
- "nodemon": "^3.1.7",
- "socket.io": "^4.8.1",
- "socket.io-client": "^4.8.1",
- "telegraf": "^4.16.3",
- "uniqid": "^5.4.0"

see package.json for more

## Front-end Libraries

- "axios": "^1.7.7",
- "crypto": "^1.0.1",
- "crypto-js": "^4.2.0",
- "dotenv": "^16.4.5",
- "ngrok": "^5.0.0-beta.2",
- "pure-react-carousel": "^1.30.1",
- "react": "^18.3.1",
- "react-dom": "^18.3.1",
- "react-hook-form": "^7.53.0",
- "react-icons": "^5.3.0",
- "react-input-mask": "^2.0.4",
- "react-responsive-modal": "^6.4.2",
- "react-router-dom": "^6.26.2",
- "socket.io-client": "^4.8.1",
- "zustand": "^5.0.0"
  
see package.json for more
## Third part API's

- https://api.monobank.ua


## General dev loop

1. restore dependencies

```
npm install
```

2. Start dev env

```shell
npm run dev 
```

## Deployment

### Environment variables required to be injected into .env

ENV | Required? | Notes
----|-----------|------
BOT_TOKEN | Yes | Telegram bot access token
Geocoder | Yes | https://locationiq.com/ api 
MONGO_DB_URI | Yes | coonect mongo db collection 
