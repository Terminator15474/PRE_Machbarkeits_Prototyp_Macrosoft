import { Schema } from "mongoose";

export const tennantSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false }
});

tennantSchema.set('toJSON', {
    transform: function (document, record) {
        for (const key in record) {
            if (key.startsWith('_')) {
                delete record[key];
            }
        }
    }
});