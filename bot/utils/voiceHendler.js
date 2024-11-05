import { AssemblyAI } from "assemblyai";
import { config } from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import { link } from "telegraf/format";
import { log } from "console";

config();

const apiKey = process.env.ASSEMBLYAI_KEY;
const web_app_url = process.env.WEB_APP_URL;

const client = new AssemblyAI({
  apiKey,
});

export const voiceMsgHendler = async (__dirname, bot, ctx) => {
  const voice = ctx.message;
  console.log("Received a voice message:", voice);


  // download the file
  const fileId = ctx.message.voice.file_id;
  const fileLink = await ctx.telegram.getFileLink(fileId);
  console.log("File link:", fileLink);
  const response = await axios({
    url: fileLink,
    method: "GET",
    responseType: "stream",
  });

  const filePath = path.join(__dirname, "downloads", `${fileId}.mp3`);
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  // transcribe the file
  const transcript = await client.transcripts.transcribe({
    audio: filePath,
    language_detection: true,
  });

  console.log("Transcript:", transcript);
  

//delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });

  await ctx.reply(`Посилання на аудіофайл: ${fileLink}`);

  const text = transcript?.text.replace(/\./g, "");

// hendler for the voice message

  if (transcript?.text.toLocaleLowerCase()) {
    await ctx.reply(text);
  }

  if(text.toLowerCase().includes("open store") || text.toLowerCase().includes("магазин")) {
    await ctx.replyWithHTML(`Відкриваємо <a href="${web_app_url}">магазин</a>`, {
      disable_web_page_preview: true,
    });

  
  }

  return text;
};
