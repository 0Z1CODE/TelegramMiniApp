import express from 'express';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import axios from 'axios';
dotenv.config();

const PORT = process.env.PARSER_PORT || 5000;
const parseTarget = process.env.PARSE_TARGET ;

const Parser = express();

Parser.use(express.json());

Parser.get('/', (req, res) => {
  res.send('Welcome to the parser');
});

async function cryptopriceScraper() {
  const url = "https://hard.rozetka.com.ua/ua/computers/c80095/";
  const result = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);
    
    const keys = ["Title","Description","status", "price_old",];
    const selectedElem = ".catalog-grid .catalog-grid__cell .goods-tile .goods-tile__inner .goods-tile__content";
    
    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const data = {};
      if (parentIndex) {
        $(parentElem)
        .children()
        .each((childId, childElem) => {
          const value = $(childElem).text();
            if (value) {
              data[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        result.push(data);
      }
    });
  });
  return result;
}

Parser.get("/data-scrapper", async (req, res) => {
  try {
    const data = await cryptopriceScraper();
    return res.status(200).json({
      result: data,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
});


const start = async () => {
 
  try {
    // await connectToMongoDb();
    Parser.listen(PORT, () => {
      console.log(`Parser Running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error in starting Parser");
  }
}

start()



