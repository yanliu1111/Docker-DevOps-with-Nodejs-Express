import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Hello World!</h2>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
