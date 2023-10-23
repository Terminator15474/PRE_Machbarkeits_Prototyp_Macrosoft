import express from 'express';
import { User } from '../model/model.js';

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export async function authMiddleware(req, res, next) {
    let session = req.session;

    console.log(`[server]: Session cookie: ${req.cookies}`);

    if (!session) {
        res.sendStatus(403);
        return;
    }

    let userObjectId = session.userObjectId;

    if (!userObjectId) {
        res.sendStatus(403);
        return;
    }

    /* let user = await User.findById(userObjectId);
    if (!user) {
        res.sendStatus(403);
        return;
    } */ // If userObjectId is present, it is assumbed, that the session is valid. This is done, because it is slow to have an additional DB request for every normal request.

    console.info(`[server] User validation successfull on user with object id: ${userObjectId} (accessing ${req.url})`);

    next();
}