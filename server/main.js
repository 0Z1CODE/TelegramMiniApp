import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/product.routes.js';
import connectToMongoDb from '../db/mongoConnect.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import telegramBotRoutes from './routes/telegramBot.routes.js';
import orderRoutes from './routes/orders.routes.js';
import paymantRoutes from './routes/paymants.routes.js';
import userRoutes from './routes/user.routes.js';
import {app, io, httpServer} from './soket.js';
import bodyParser from 'body-parser';
import { Telegraf } from 'telegraf';
import botRoutes from './routes/telegraf.routes.js';
// import { ApexImageAnalyzer } from 'apexify.js'; 


dotenv.config();

// const imageUrl =
//   'https://content.rozetka.com.ua/goods/images/big/437818414.jpg'; // URL of the image to analyze
// const prompt = 'Get the product name of this image.';
// const analysisResult = await ApexImageAnalyzer({ imgURL: imageUrl, prompt });
// console.log(analysisResult); // Logs the analysis result from Groq


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// const app = express();
const port = process.env.PORT || 5005;
const client = process.env.WEB_APP_URL;
const SERVER_URL = process.env.SERVER_URL;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
		origin: client,
		methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
		allowedHeaders: [ 'Content-Type' ]
	})
);

app.use('/products', productRoutes);
app.use('/users', productRoutes);
app.use('/order', orderRoutes);
app.use('/payments', paymantRoutes);
app.use('/telegram', telegramBotRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/telegraf', botRoutes);





const start = async () => {
	try {
		await connectToMongoDb();
		httpServer.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();

