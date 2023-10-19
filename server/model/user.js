import { Schema } from "mongoose";

export const userSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    salt: { type: String, required: false },
    confirmedUser: { type: Boolean, required: true },
});

userSchema.set('toJSON', {
    transform: function (document, record) {
        for (const key in record) {
            if (key.startsWith('_')) {
                delete record[key];
            }
        }
    }
});