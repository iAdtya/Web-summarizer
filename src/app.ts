import express, { Express } from "express";
import { json } from "body-parser";
import cors from "cors";
import routes from "./routes/index";
import dotenv from "dotenv";
dotenv.config();
// import http from "http";
import logger from "./logging/logger";

const app: Express = express();
const PORT = process.env.PORT || 5000;

//cors
app.use(cors());

//middleware
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routes);

// let server: http.Server;
let server;

// start the server
const startServer = async (): Promise<void> => {
  try {
    server = app.listen(PORT, () => {
      logger.info(`Server beating 💓 on port :: ${PORT}`);
    });
  } catch (error: any) {
    logger.error(`Error occurred: ${error.message}`);
  }
};

startServer();

export { app, server };
