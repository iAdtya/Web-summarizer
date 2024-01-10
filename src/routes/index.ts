import express from "express";
import { scrapeWebPage } from "../controllers/scrape_web_page";
import logger from "../logging/logger";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.status(200).send("Hello this is Web-Summarizer API");
});

router.post("/summary", async (req, res) => {
  const { url } = req.body;
  try {
    const summary = await scrapeWebPage(url);
    res.status(200).json({ summary: summary.message });

    logger.info(`Summary of ${url} is ${summary.message}`);
  } catch (error) {
    logger.error(`Error occurred while summarizing ${url} ${error}`);

    res
      .status(500)
      .json({ error: "An error occurred while summarizing the webpage" });
  }
});

logger.info("router loaded");

export default router;
