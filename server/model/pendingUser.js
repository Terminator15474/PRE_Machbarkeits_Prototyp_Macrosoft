import { Schema } from "mongoose";

export const pendingUserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    confirmationString: { type: String, unique: true, required: true },
    validUntil: { type: Date, required: true },
});

pendingUserSchema.set('toJSON', {
    transform: function (document, record) {
        for (const key in record) {
            if (key.startsWith('_')) {
                delete record[key];
            }
        }
    }
});