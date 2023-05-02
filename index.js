import RedisStore from "connect-redis";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import { createClient } from "redis";

import {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_PORT,
  REDIS_URL,
  SESSION_SECRET,
} from "./config/config.js";

let redisClient = createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("error", (err) =>
  console.log("Redis Client Connection Error", err)
);

connectWithRetry();
//middleware, it will run before any request, ensure that body gets attached to the request object
app.enable("trust proxy"); //neccessary for prod deployment
app.use(cors({}));
let myRedisStore = new RedisStore({ client: redisClient });
// console.log("myRedisStore", myRedisStore);
let mySession = session({
  store: myRedisStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30000,
  },
});
// console.log("mySession", mySession);
app.use(mySession);

app.use(express.json());
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi There</h2>");
  console.log("HEY THERE!!!");
});
//api/v1 means api, this request is for your api in case you hosting your frontend and backend within same domain, then specify the version of your api, so you can start the second version you can run side by side
//localhost:3000/api/v1/posts will go to our postRouter
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
