import dotenv from "dotenv";
import express from "express";
import { indexHandler, appartmentHandler } from "./handlers/handlers.js";
import './db/mongo.js';
dotenv.config();


const app = express();

app.get("/", indexHandler);

app.get("/api/appartments/:id", appartmentHandler);

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info("[server]: is running");
});

