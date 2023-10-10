import { Schema } from "mongoose";

export let apartmentSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    tennents: [{
        tennent: { type: Schema.Types.ObjectId, ref: 'Tennent', required: true },
        leaseStart: { type: Date, required: true },
        leaseEnd: { type: Date, required: true },
        emailSent: { type: Boolean, required: true },
    }],
});

apartmentSchema.set('toJSON', {
    transform: function (document, record) {
        for (const key in record) {
            if (key.startsWith('_')) {
                delete record[key];
            }
        }
        record.tennents = record.tennents.map(tennent => {
            for (const key in tennent) {
                if (key.startsWith('_')) {
                    delete tennent[key];
                }
            }
            return tennent;
        });
    }
});