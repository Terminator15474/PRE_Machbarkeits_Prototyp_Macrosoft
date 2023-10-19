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

    if (!session) {
        res.sendStatus(403);
        return;
    }

    let userObjectId = session.userObjectId;

    if (!userObjectId) {
        res.sendStatus(403);
        return;
    }

    let user = await User.findById(userObjectId);
    if (!user) {
        res.sendStatus(403);
        return;
    }

    console.info(`[server] User validation successfull on user with email: ${user.email} (accessing ${req.url})`);

    next();
}