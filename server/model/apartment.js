import { Schema } from "mongoose";

export let apartmentSchema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    tenants: [{
        tenant: { type: Schema.Types.ObjectId, ref: 'tenant', required: true },
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
        record.tenants = record.tenants.map(tenant => {
            for (const key in tenant) {
                if (key.startsWith('_')) {
                    delete tenant[key];
                }
            }
            return tenant;
        });
    }
});