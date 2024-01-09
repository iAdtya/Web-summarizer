import express from "express";
import { scrapeWebPage } from "../controllers/scrape_web_page";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.status(200).send("Hello this is Web-Summarizer API");
});

router.post("/summary", async (req, res) => {
  const { url } = req.body;
  try {
    const summary = await scrapeWebPage(url);
    res.status(200).json({ summary: summary.message });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while summarizing the webpage" });
  }
});

console.log("router loaded");

export default router;
