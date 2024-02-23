import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";
import ProgressBar from "progress";

const cvWriter = createObjectCsvWriter({
  path: "./app/datas/vacancies.csv",
  header: [
    { id: "index", title: "Number" },
    { id: "title", title: "Title" },
    { id: "date", title: "Date" },
    { id: "description", title: "Description" },
    { id: "link", title: "Link" },
  ],
});

let itemCount = 0;
const totalItems = 50;
const progressBar = new ProgressBar(":bar :current items", {
  total: parseInt(String(totalItems)),
  width: 40,
});

async function scrapePage(url: string): Promise<any> {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const nextPageUrl = $(".blog-pager > a").attr("id");
  const nextUrl: any = $(".blog-pager > a").attr("data-load");
  const items = $(".grid-posts > article")
    .map((_, elem) => {
      const title: string = $(elem).find(".entery-category-box > h2").text();
      const index = itemCount + 1;
      const date: string = $(elem).find(".post-snip > span").text();
      const description: string = $(elem).find(".entery-snipt > p").text();
      const link: any = $(elem).find(".entery-snipt > a").attr("href");
      itemCount++;
      return { index, title, date, description, link };
    })
    .get();

  progressBar.tick(items.length + 1);

  if (parseInt(String(itemCount)) + 1 >= totalItems) {
    return items;
  }

  if (nextPageUrl !== undefined) {
    const nextPageItems = await scrapePage(nextUrl);
    cvWriter.writeRecords(items);
    return items.concat(nextPageItems);
  } else {
    return items;
  }
}

const initialUrl = "https://www.cameroondesks.com/";
scrapePage(initialUrl)
  .then((items) => {
    cvWriter.writeRecords(items);
    const jsonContent = JSON.stringify(items);
    fs.writeFile("./app/datas/vacancies.json", jsonContent, "utf8", (error) => {
      if (error) console.log(error);
      process.exit();
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
