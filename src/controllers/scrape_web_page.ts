import puppeteer from "puppeteer";
import { summerizeWebPage } from "./summarize_web_page";

export const scrapeWebPage = async (url: string) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, {
    // use networkidle0 to scrape the complete page (all requests finished loading)
    waitUntil: "domcontentloaded",
  });
  const content = await page.evaluate(() => document.body.outerHTML);
  await browser.close();

  const summary = await summerizeWebPage(content);

  //cache the summary with the url as the key
  return summary;
};
