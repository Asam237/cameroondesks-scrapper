import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";

const url = "https://www.cameroondesks.com/";
const AxiosInstance = axios.create();
const cvWriter = createObjectCsvWriter({
  path: "./app/datas/vacancies.csv",
  header: [
    { id: "index", title: "Rank" },
    { id: "title", title: "Title" },
    { id: "date", title: "Date" },
    { id: "description", title: "Description" },
    { id: "link", title: "Link" },
  ],
});

interface IVancancy {
  index: number;
  title: string;
  date: any;
  description: string;
  link: string;
}

AxiosInstance.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const vacanciesRow = $(".grid-posts > article");
    const vacancies: IVancancy[] = [];
    vacanciesRow.each((i, elem) => {
      const title: string = $(elem).find(".entery-category-box > h2").text();
      const date: string = $(elem).find(".post-snip > span").text();
      const description: string = $(elem).find(".entery-snipt > p").text();
      const link: any = $(elem).find(".entery-snipt > a").attr("href");
      vacancies.push({
        index: parseInt(String(i)) + 1,
        title,
        date,
        description,
        link,
      });
    });
    //console.log(vacancies);
    console.log("Saved !");
    const jsonContent = JSON.stringify(vacancies);
    cvWriter.writeRecords(vacancies);
    fs.writeFile("./app/datas/vacancies.json", jsonContent, "utf8", (error) => {
      if (error) console.log(error);
      process.exit();
    });
  })
  .catch(console.error);
