import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.routes.js"
import connectToMongoDb from '../db/mongoConnect.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 5005

app.use(express.json())
app.use(cookieParser());


console.log(__dirname);


app.use("/products", productRoutes)
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
