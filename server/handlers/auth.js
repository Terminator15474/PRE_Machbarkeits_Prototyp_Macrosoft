import { PendingUser, User } from '../model/model.js';
import express from 'express';
import crypto from "crypto";
import bycrpt from "bcrypt"
import nodemailer from "nodemailer";
import emailValidator from "email-validator";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 10;

const emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    debug: true,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

/**
 * handler for /api/users?show_pending=<boolean>
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function listAllUsersHandlers(req, res) {
    let showPending = req.query.show_pending;
    if (showPending == undefined) {
        showPending = false;
    } else {
        showPending = showPending == 'true';
    }
    let users = await User.find({ confirmedUser: { $in: [true, !showPending] } }).select("-password -salt");
    res.send(users);
}


/**
 * Handler for the route /api/create_user
 * 
 * body format: {
 *  username: <String>,
 *  email: <String>,
 * }
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function createUserHandler(req, res) {
    let username = req.body.username;
    let email = req.body.email;

    if (!username || !email) {
        res.status(400).send({ reason: "malformed body" });
        return;
    }

    username = String(username);
    email = String(email);

    let emailValid = emailValidator.validate(email);

    if (!emailValid) {
        res.status(400).send({ reason: "email is invalid" });
        return;
    }

    let userWithEmail = await User.findOne({ email: email });
    if (userWithEmail) {
        res.status(400).send({ reason: "email already exists" });
        return;
    }

    let maxUserId = -1;

    let userWithMaxId = await User.find({});
    if (userWithMaxId.length != 0) {
        console.log(userWithMaxId);
        maxUserId = Number(userWithMaxId[userWithMaxId.length - 1].id);
    }



    maxUserId = maxUserId + 1;

    let newUser = new User({
        id: maxUserId,
        username: username,
        email: email,
        confirmedUser: false,
    });

    await newUser.save();
    // TODO: A way to send an email to the user + save into pending users for a way to confirm and set password

    let pendingId = crypto.randomUUID();

    const DAY_IN_MS = 24 * 60 * 60 * 1000;

    let pendingUser = new PendingUser({
        confirmationString: pendingId,
        userId: newUser._id,
        validUntil: new Date(Date.now() + DAY_IN_MS),
    });

    await pendingUser.save();

    let emailResponse = await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Benutzer erstellt',
        text: `Hallo ${username},
        für diese Email Addresse wurde ein Benutzer erstellt. Ihr Bestätigungscode lautet: ${pendingId}. Diese ist 24 Stunden gültig.`
    });

    if (emailResponse.error || !emailResponse) {
        console.error(`[server] An error occured while trying to end a email to the email address: ${email}.`);
        console.error(`${emailResponse.error}`);
        res.sendStatus(500);
        return;
    }

    console.info(`[server] Email successfully sent to address: ${email}. Email info: ${emailResponse.info}`);

    res.sendStatus(200);
}

/**
 * {
 *  confirmationString: <String>,
 *  password: <string>
 * }
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function confirmUser(req, res) {
    let confirmationString = req.body.confirmationString;
    let password = req.body.password;

    if (!confirmationString || !password) {
        res.status(400).send({ reason: "malformed body" });
        return;
    }

    confirmationString = String(confirmationString);
    password = String(password);

    let pendingUser = await PendingUser.findOne({ confirmationString: confirmationString, validUntil: { $gt: new Date(Date.now()) } });
    if (!pendingUser) {
        res.status(400).send({ reason: "Confirmation string is not valid" });
        return;
    }

    let user = await User.findById(pendingUser.userId);

    console.log(pendingUser.userId);

    if (!user) {
        res.sendStatus(500);
        return;
    }

    let salt = await bycrpt.genSalt(SALT_ROUNDS);
    let hashedPassword = await bycrpt.hash(password, salt);

    user.password = hashedPassword;
    user.confirmedUser = true;

    await user.save();

    await pendingUser.deleteOne();

    res.sendStatus(200);
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.status(400).send({ reason: "malformed body" });
        return;
    }

    email = String(email);
    password = String(password);

    let user = await User.findOne({ email: email });

    if (!user) {
        res.status(403).send({ reason: "invalid credentials" });
        return;
    }

    let correctPassword = await bycrpt.compare(password, user.password);

    if (!correctPassword) {
        res.status(403).send({ reason: "invalid credentials" });
        return;
    }

    req.session.userId = user.id;
    req.session.userObjectId = user._id;

    console.info("[server] login");
    let jsonUser = user.toJSON();
    delete jsonUser.password;
    delete jsonUser.confirmedUser;
    res.send(jsonUser);
}

export async function logout(req, res) {
    req.session = null;
    res.sendStatus(200);
}

export async function getLoggedInStatus(req, res) {
    res.sendStatus(200);
}