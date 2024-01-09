import express from "express";
import { json } from "body-parser";
import cors from "cors";
import routes from "./routes/index";
import client from "./redisClient";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//cors
app.use(cors());

//middleware
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", routes);

client.on("connect", function () {
  console.log("Connected to Redis server");
});

client.on("error", function (error) {
  console.error("Error connecting to Redis server: ", error);
});

// start the server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server beating 💓 on port :: ${PORT}`);
    });
  } catch (error) {
    PORT;
    console.log("Error connecting to MongoDB:", error);
  }
};

startServer();
