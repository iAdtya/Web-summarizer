import OpenAI from "openai";
const openai = new OpenAI();
import logger from "../logging/logger";

export const summerizeWebPage = async (content: any) => {
  logger.info(`Summarizing the content of the web page ${content}`);
  // i have to pipe the content of the web page into this function
  // and then return the summary

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Web-Summarizer is a bot which takes scraped website text and explains in brief about the content of the page ",
      },
      { role: "user", content: content },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
};
