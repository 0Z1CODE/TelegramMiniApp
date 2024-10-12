import express from "express";
import dotenv from "dotenv";
import * as cheerio from "cheerio";
import axios from "axios";
dotenv.config();

const PORT = process.env.PARSER_PORT || 5001;
const parseTarget = process.env.PARSE_TARGET;

const Parser = express();

Parser.use(express.json());

Parser.get("/", (req, res) => {
  res.send("Welcome to the parser");
});

async function cryptopriceScraper() {
  const i = "https://versum.ua/";
  const url = "https://versum.ua/pc/pc-use/bazovij-igrovij/";
  const result = [];
  await axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);

    const keys = ["line", "Title", "Serise", "Complect", "Price", "Images"];
    const selectedElem = ".catalog .catalog-col .catalog-item";
    const selectImages = ".catalog .catalog-col .catalog-item .catalog-img";

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const data = {};
      if (parentIndex) {
        $(parentElem)
          .children()
          .each((childId, childElem) => {
            let value = $(childElem)
              .text()
              .replace(/<\/?[^>]+(>|$)/g, "")
              .replace(/\n/g, "")
              .replace(/VERSUM/g, "COMPLECT")
              .trim();
            if (keys[keyIndex] === "Price") {
              value = value.split("грн")[0].trim();
            }
            if (value) {
              data[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        const imgSrc = $(parentElem).find("img").attr("src");
        if (imgSrc) {
          data["Images"] = i +  imgSrc;
        }
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
};

start();
