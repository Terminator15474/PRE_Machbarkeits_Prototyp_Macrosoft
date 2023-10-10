import mongoose from 'mongoose';
import { Apartment, Tennent } from '../model/model.js';

import dotenv from "dotenv";
dotenv.config();

async function connectToDatabase() {
    let mongodbURL = process.env.MONGODB_URL;
    await mongoose.connect(mongodbURL);
    /* let testTennent = new Tennent({
        id: 1,
        name: "Alexander Holzinger",
        email: "alexholzinger@gmail.com"
    });

    testTennent.save();

    let test = new Apartment(
        {
            id: 1,
            name: "test",
            tennents: [{
                tennent: {
                    _id: testTennent._id,
                },
                leaseStart: new Date(Date.now()),
                leaseEnd: new Date('2023-12-12'),
                emailSent: true,
            }]
        }
    );
    console.log("saving");
    test.save(); */
}

connectToDatabase();
