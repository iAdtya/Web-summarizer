import express from "express";
import * as redis from "redis";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import routes from "./routes/index";

const app = express();
const port = 3000;
const client = redis.createClient();

//cors
app.use(cors());

//middleware
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routes);

// start the server
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server beating 💓 on port :: ${port}`);
    });
  } catch (error) {
    port;
    console.log("Error connecting to MongoDB:", error);
  }
};

startServer();
