import mongoose from 'mongoose';
import { Apartment, Tenant } from '../model/model.js';

import dotenv from "dotenv";
dotenv.config();

async function connectToDatabase() {
    let mongodbURL = process.env.MONGODB_URL;
    await mongoose.connect(mongodbURL);
    /*let testTennent = new Tenant({
        id: 3,
        name: "Daniel Nehammer",
        email: "NehammerDaniel@gmail.com"
    });

    testTennent.save();

    let test = new Apartment(
        {
            id: 3,
            name: "test2",
            tennents: [{
                tennent: {
                    _id: testTennent._id,
                },
                leaseStart: new Date(Date.now()),
                leaseEnd: new Date(new Date(Date.now()+1000 * 60 * 60 * 24 * 30)),
                emailSent: true,
            }]
        }
    );
    console.log("saving");
    test.save();*/
}

connectToDatabase();
