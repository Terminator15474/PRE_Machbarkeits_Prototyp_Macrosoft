import mongoose from 'mongoose';
import { Apartment, Tenant } from '../model/model.js';

import dotenv from "dotenv";
dotenv.config();

async function connectToDatabase() {
    let mongodbURL = process.env.MONGODB_URL;
    await mongoose.connect(mongodbURL);
    /*let testTenant = new Tenant({
        id: 3,
        name: "Daniel Nehammer",
        email: "NehammerDaniel@gmail.com"
    });

    testTenant.save();

    let test = new Apartment(
        {
            id: 3,
            name: "test2",
            tenants: [{
                tenant: {
                    _id: testTenant._id,
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
