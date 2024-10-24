import CryptoJS from 'crypto-js';

export const validateDataFromBot = async (req, res) => {
	const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
	const initData = new URLSearchParams(req.body.data);
	const hash = initData.get("hash");
	let dataToCheck = [];
  

  initData.sort();
  initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
  
  const secret = CryptoJS.HmacSHA256(TELEGRAM_BOT_TOKEN, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
  
  // const userData = initData.get("user_data");

  if(_hash === hash) {
    const userData = JSON.parse(initData.get("user"));
    res.status(200).json({status: "ok", userData});
  } else {
    res.status(400).json({status: "error"});
  }

};
