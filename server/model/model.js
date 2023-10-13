import mongoose from "mongoose";
import { apartmentSchema } from "./apartment.js";
import { tenantSchema } from "./tenant.js";


export const Tenant = mongoose.model('Tennent', tenantSchema);

export const Apartment = mongoose.model('Appartment', apartmentSchema);