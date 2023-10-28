import dotenv from "dotenv";
import express from "express";
import { getAllTennentsHandler, getApartmentHandler, getAllApartmentsHandler, occupiedHandler, getOneTenantHandler, linkTenantToApartmentHandler, listAllUsersHandlers, pendingUserInfoHandler, createUserHandler, confirmUser, login, logout, getLoggedInStatus } from "./handlers/handlers.js";
import cors from "cors";
import cookieSession from "cookie-session";
// import { handler } from "../build/handler.js";
import './db/mongo.js';
import { authMiddleware } from "./middleware/auth.js";
import { exit } from "process";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
dotenv.config();

let normalRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 150,
    standartHeaders: 'draft-7',
    legacyHeaders: false,
});

let loginStatusRateLimiter = rateLimit({
    limit: 200,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

function checkIfEnvVarsPresent() {
    let mongoDBURL = process.env.MONGODB_URL;
    let cookieSecret = process.env.COOKIE_SECRET;
    let serverPort = process.env.SERVER_PORT;
    let sessionMaxInactiveMin = process.env.SESSION_MAX_INACTIVE_MIN;
    let emailHost = process.env.EMAIL_HOST;
    let emailPort = process.env.EMAIL_PORT;
    let emailUser = process.env.EMAIL_USER;
    let emailPassword = process.env.EMAIL_PASSWORD;

    let error = false;

    if (!mongoDBURL) {
        console.error(`[server]: Error: Environment variable MONGODB_URL is missing!`);
        error = true;
    }

    if (!cookieSecret) {
        console.error(`[server]: Error: Environment variable COOKIE_SECRET is missing!`);
        error = true;
    }

    if (!serverPort) {
        console.error(`[server]: Error: Environment variable SERVER_PORT is missing!`);
        error = true;
    }

    if (!sessionMaxInactiveMin) {
        console.error(`[server]: Error: Environment variable SESSION_MAX_INACTIVE_MIN is missing!`);
        error = true;
    }

    if (!emailHost) {
        console.error(`[server]: Error: Environment variable EMAIL_HOST is missing!`);
        error = true;
    }

    if (!emailPort) {
        console.error(`[server]: Error: Environment variable EMAIL_PORT is missing!`);
        error = true;
    }

    if (!emailUser) {
        console.error(`[server]: Error: Environment variable EMAIL_USER is missing!`);
        error = true;
    }

    if (!emailPassword) {
        console.error(`[server]: Error: Environment variable EMAIL_PASSWORD is missing!`);
        error = true;
    }

    if (error) {
        exit(1);
    }
}

checkIfEnvVarsPresent();

const app = express();

let cookieSecret = process.env.COOKIE_SECRET;
let sessionMaxInactiveTime = Number(process.env.SESSION_MAX_INACTIVE_MIN);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json());

app.use(cookieSession({
    httpOnly: true,
    secret: cookieSecret,
    name: "session",
    signed: true,
    sameSite: true,
    maxAge: sessionMaxInactiveTime * 60 * 1000,
}));

app.use(cookieParser());

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(404);
})

// Get requests
app.get("/api/apartments/:id", normalRateLimiter, authMiddleware, getApartmentHandler);

app.get("/api/apartments", normalRateLimiter, authMiddleware, getAllApartmentsHandler);

app.get("/api/get_occupents", normalRateLimiter, authMiddleware, occupiedHandler);

app.get("/api/tenants", normalRateLimiter, authMiddleware, getAllTennentsHandler);

app.get("/api/tenants/:id", normalRateLimiter, authMiddleware, getOneTenantHandler)

app.get("/api/users", normalRateLimiter, authMiddleware, listAllUsersHandlers);

app.get("/api/login_status", loginStatusRateLimiter, authMiddleware, getLoggedInStatus);

app.get("/api/pending_id_valid", normalRateLimiter, pendingUserInfoHandler);

// Post requests

app.post("/api/link_tenant_to_apartment", normalRateLimiter, authMiddleware, linkTenantToApartmentHandler);

app.post("/api/create_user", normalRateLimiter, authMiddleware, createUserHandler);

app.post("/api/confirm_user", normalRateLimiter, confirmUser);

app.post("/api/login", normalRateLimiter, login);

app.post("/api/logout", normalRateLimiter, authMiddleware, logout);

// app.use(handler); //commented out for now, as in development, serving on the api server only causes confusion. 
// unsure if frontend should be a seperate server or should be in the api backend? For development, it is relevant

let port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.info(`[server]: is running on port: ${port}. URL (if dev): ${`http://localhost:${port}/`}`);
});