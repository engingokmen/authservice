import express from "express";
import { mongoConnect } from "./mongoConnection.js";
import { user } from "./controller.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 8080;

// parse application/json
app.use(bodyParser.json());

app.post("/signin", user.signin);
app.post("/signup", user.signup);

app.listen(port, () => {
  console.log(`dtapp listening at http://localhost:${port}`);
});

mongoConnect().catch((err) => console.log(err));
