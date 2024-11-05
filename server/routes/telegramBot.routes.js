import express from "express";
import {
  validateDataFromBot,
} from '../controllers/telegramBot.controller.js';

const router = express.Router();

router.post('/validate', validateDataFromBot);



export default router;