import puppeteer from "puppeteer";
import { summerizeWebPage } from "./summarize_web_page";
import client from "../redisClient";

export const scrapeWebPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, {
    // use networkidle0 to scrape the complete page (all requests finished loading)
    waitUntil: "domcontentloaded",
  });
  const content = await page.evaluate(() => document.body.outerHTML);
  await browser.close();

  // const cachedSummary = await new Promise<string | null>((resolve, reject) => {
  //   client.get(url, (error: Error | null, result: string | null) => {
  //     if (error) reject(error);
  //     resolve(result);
  //   });
  // });

  // if (cachedSummary) {
  //   return JSON.parse(cachedSummary);
  // }

  const summary = await summerizeWebPage(content);

  //cache the summary with the url as the key
  // client.set(url, JSON.stringify(summary));
  return summary;
};
