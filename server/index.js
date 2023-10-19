import dotenv from "dotenv";
import express from "express";
import { getAllTennentsHandler, getApartmentHandler, getAllApartmentsHandler, occupiedHandler, getOneTenantHandler, linkTenantToApartmentHandler, listAllUsersHandlers, createUserHandler, confirmUser, login, logout } from "./handlers/handlers.js";
import cors from "cors";
import cookieSession from "cookie-session";
// import { handler } from "../build/handler.js";
import './db/mongo.js';
import { authMiddleware } from "./middleware/auth.js";
dotenv.config();

const app = express();

let cookieSecret = process.env.COOKIE_SECRET || "my_super_secret_key";
let sessionLength = Number(process.env.SESSION_LENGTH_MIN) || 60;

app.use(cors());
app.use(express.json());

app.use(cookieSession({
    httpOnly: true,
    secret: cookieSecret,
    name: "session",
    signed: true,
    sameSite: true,
    maxAge: sessionLength * 60 * 1000,
}));

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
})

// Get requests
app.get("/api/apartments/:id", authMiddleware, getApartmentHandler);

app.get("/api/apartments", authMiddleware, getAllApartmentsHandler);

app.get("/api/get_occupents", authMiddleware, occupiedHandler);

app.get("/api/tenants", authMiddleware, getAllTennentsHandler);

app.get("/api/tenants/:id", authMiddleware, getOneTenantHandler)

app.get("/api/users", authMiddleware, listAllUsersHandlers);


// Post requests

app.post("/api/link_tenant_to_apartment", authMiddleware, linkTenantToApartmentHandler);

app.post("/api/create_user", authMiddleware, createUserHandler);

app.post("/api/confirm_user", authMiddleware, confirmUser);

app.post("/api/login", login);

app.post("/api/logout", authMiddleware, logout);

// app.use(handler); //commented out for now, as in development, serving on the api server only causes confusion. 
// unsure if frontend should be a seperate server or should be in the api backend? For development, it is relevant

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info(`[server]: is running on port: ${port}. URL (if dev): ${`http://localhost:${port}/`}`);
});