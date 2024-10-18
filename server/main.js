import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js"
import connectToMongoDb from '../db/mongoConnect.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import telegramBotRoutes from "./routes/telegramBot.routes.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 5005
const client = process.env.WEB_APP_URL

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: client,
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],
  allowedHeaders: [
    'Content-Type',
  ],
}));



app.use("/products", productRoutes)
app.use("/telegram", telegramBotRoutes)
app.use('/images',  express.static(path.join(__dirname, 'images')));



const start = async () => {
  try {
    await connectToMongoDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
