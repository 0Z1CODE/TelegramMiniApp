# TofAi Pravtice Telegram bot with MiniApp

## Bot link 

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
- https://us1.locationiq.com/v1/reverse


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

```shell
pm2 start 'npm run all'
```

### Server config

- [dockge](https://dockge.kuma.pet/),
- [nginx proxy](https://nginxproxymanager.com/),
- https://www.npmjs.com/,
- https://pm2.keymetrics.io/

### Environment variables required to be injected into .env

ENV | Required? | Notes
----|-----------|------
BOT_TOKEN | Yes | Telegram bot access token
Geocoder | Yes | https://locationiq.com/ api 
SERVER_PORT | Yes | 5005 
ASSEMBLYAI_KEY | Yes | token of assemblyai 
MONGO_USER_PASS | Yes | pass
ADMIN_CHAT_ID | Yes | telegram chat id 
MONGO_DB_URI | Yes | mongo connection uri
WEB_APP_URL | Yes | https://marokhonko.space
SERVER_URL | Yes | https://api.marokhonko.space
ADMIN_CHAT_ID | Yes | telegram chat id 


### Про проект: 
Телеграм бот з вбудованим телеграм міні засточунком. 
В застосунку реалізовано можливість швидкої покупки одного товару та його оплати. 
При заповнені даних про покупця і доставки є можливість автоматично пвдстановки номеру телефону і геолокації. 
Деякі дані піддягужться з иелеграм автоматично. 
Сам боте вміє розповізти про завантажене зображення і перетворити голосове повідомлення в текст, за допомогою аі бібліотек. 
Також є можливість надсилати повідомлення про замовлення в адмін канал. 
- голос https://www.assemblyai.com/
- зображення https://apexifyjs.jedi-studio.com/
Бот і сервіерна частина проекту написані з використанням node.js
Міні програма - react.js
Під проект налаштований vps сервер проект розроблявся відразу на сервері. 
Для оплати використано тестове апі монобанку. 
Запити обробляються за допомогою [axios](https://axios-http.com/ru/docs/intro) та [socket.io](https://socket.io/) підключень. 
Проект надалі знаходиться на етапі розробки. Деякі фічі я не всиг реалізувати. 
Дякую за увагу. 


- 
