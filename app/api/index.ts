import express, { Request, Response } from "express";
import * as fs from "fs/promises";
import path from "path";

const app = express();
const port = 3000;

const jsonFilePath = path.join(__dirname, "../datas/vacancies.json");

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
