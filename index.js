import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://mongoadmin:mypassword@172.27.0.2:27017/?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
