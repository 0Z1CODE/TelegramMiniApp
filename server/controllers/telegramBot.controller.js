/** @format */

import CryptoJS from 'crypto-js';
import User from './../../db/models/user.model.js';

export const validateDataFromBot = async (req, res) => {
  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const initData = new URLSearchParams(req.body.data);
  const hash = initData.get('hash');
  let dataToCheck = [];

  initData.sort();
  initData.forEach(
    (val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`),
  );

  const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, 'WebAppData');
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(
    CryptoJS.enc.Hex,
  );

  if (_hash === hash) {
    const data = JSON.parse(initData.get('user'));
    const query_id = initData.get('query_id');
    const user_inDB = await User.findOne({ telegram_id: data.id });
    const userData = { ...data, sysId: user_inDB._id };
    res.status(200).json({ status: 'ok', userData, query_id });
  } else {
    res.status(400).json({ status: 'error' });
  }
};

export const telegramBotHook = async (req, res) => {
  const { message } = req.body;
  console.log(message);
  res.status(200).json({ status: 'ok' });
}