import dotenv from "dotenv";
import express from "express";
import { indexHandler } from "./handlers/handlers.js";


dotenv.config();


const app = express();

app.get("/", indexHandler);

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info("[server]: is running");
});

