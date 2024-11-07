import express from "express";
import {
  validateDataFromBot,
  getTelegtramLocation
} from '../controllers/telegramBot.controller.js';

const router = express.Router();

router.post('/validate', validateDataFromBot);
router.post('/location', getTelegtramLocation);



export default router;