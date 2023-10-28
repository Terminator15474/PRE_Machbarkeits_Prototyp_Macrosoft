import express from 'express';
import { User } from '../model/model.js';
import { configDotenv } from 'dotenv';
import { randomBytes } from 'crypto';
configDotenv();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export async function authMiddleware(req, res, next) {
    let session = req.session;

    if (!session) {
        res.sendStatus(403);
        return;
    }

    let userObjectId = session.userObjectId;

    if (!userObjectId) {
        res.sendStatus(403);
        return;
    }

    let userObject = session.userObject;

    if (!userObject) {
        res.sendStatus(403);
        return;
    }


    /* let user = await User.findById(userObjectId);
    if (!user) {
        // Test
        res.sendStatus(403);
        return;
    } */ // If userObjectId is present, it is assumbed, that the session is valid. This is done, because it is slow to have an additional DB request for every normal request.

    console.info(`[server] User validation successfull on user: ${userObject.email} (accessing ${req.url})`);

    req.session.random = randomBytes(64).toString("base64"); // Rolling session -> session is extended to 15 minutes on every reqest = SESSION_MAX_INACTIVE var is used

    next();
}