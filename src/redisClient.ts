import * as redis from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = redis.createClient({
  url: process.env.redis_host,
  //accessing the redis
  password: process.env.redis_pass,
});

export default client;
