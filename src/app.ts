import express from "express";
import * as redis from "redis";
import { scrapeWebPage } from "./controllers/scrape_web_page";
import path from "path";
import { json, urlencoded } from "body-parser";

const app = express();
const port = 3000;
const client = redis.createClient();

//middleware
app.use(json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
  scrapeWebPage("https://sneaker-head-store.vercel.app/");
});

// start the server
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
