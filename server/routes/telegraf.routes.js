/** @format */

import express from 'express';
import { telegrafHook } from '../controllers/telegrafHook.controller.js';

const router = express.Router();

router.post('/:token', telegrafHook);

export default router;
