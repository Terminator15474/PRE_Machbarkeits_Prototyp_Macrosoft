import mongoose from 'mongoose';
import { appartment } from '../model/model.js';

import dotenv from "dotenv";
dotenv.config();

async function connectToDatabase() {
    let mongodbURL = process.env.MONGODB_URL;
    await mongoose.connect(mongodbURL);
    /* let test = new appartment(
        {
            name: "test",
            tennents: [{
                name: "Alex",
            }]
        }
    );
    console.log("saving"); */
    // test.save();
}

connectToDatabase();
