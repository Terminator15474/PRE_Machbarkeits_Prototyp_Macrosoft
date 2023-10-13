import dotenv from "dotenv";
import express from "express";
import { indexHandler, apartmentHandler, getAllApartmentsHandler, occupiedHandler } from "./handlers/handlers.js";
import cors from "cors";
import { handler } from "../build/handler.js";
import './db/mongo.js';
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());


app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
})

app.get("/api/apartments/:id", apartmentHandler);

app.get("/api/apartments", getAllApartmentsHandler);

app.get("/api/get_occupents", occupiedHandler);

app.use(handler);

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info("[server]: is running");
});