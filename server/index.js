import dotenv from "dotenv";
import express from "express";
import { getAllTennentsHandler, apartmentHandler, getAllApartmentsHandler, occupiedHandler, getOneTenantHandler, linkTenantToApartmentHandler } from "./handlers/handlers.js";
import cors from "cors";
// import { handler } from "../build/handler.js";
import './db/mongo.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
})

// Get requests
app.get("/api/apartments/:id", apartmentHandler);

app.get("/api/apartments", getAllApartmentsHandler);

app.get("/api/get_occupents", occupiedHandler);

app.get("/api/tenants", getAllTennentsHandler);

app.get("/api/tenants/:id", getOneTenantHandler)


// Post requests

app.post("/api/link_tenant_to_apartment", linkTenantToApartmentHandler);

// app.use(handler); //commented out for now, as in development, serving on the api server only causes confusion. 
// unsure if frontend should be a seperate server or should be in the api backend? For development, it is relevant

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info(`[server]: is running on port: ${port}. URL (if dev): ${`http://localhost:${port}/`}`);
});