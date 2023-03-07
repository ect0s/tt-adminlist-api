import express, { json } from "express";
import bodyParser from "body-parser";
import { router } from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(bodyParser.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`App up on ${PORT}`);
});
//Catch All 404 Handler
app.all("*", (req, res) => {
  return res.sendStatus(404);
});
