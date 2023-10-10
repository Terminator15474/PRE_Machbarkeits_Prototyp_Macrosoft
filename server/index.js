import dotenv from "dotenv";
import express from "express";
import { indexHandler, apartmentHandler, getAllApartmentsHandler, occupiedHandler } from "./handlers/handlers.js";
import './db/mongo.js';
dotenv.config();


const app = express();

app.use(express.json());

app.get("/", indexHandler);

app.get("/api/apartments/:id", apartmentHandler);

app.get("/api/apartments", getAllApartmentsHandler);

app.get("/api/get_occupents", occupiedHandler);

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info("[server]: is running");
});