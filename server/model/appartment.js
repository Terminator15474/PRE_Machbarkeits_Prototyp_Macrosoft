import { Schema } from "mongoose";

export let appartmentModel = new Schema({
    name: String,
    tennents: [{
        name: String,
        leaseStart: Date,
        leaseEnd: Date,
        emailSent: Boolean,
    }],
});