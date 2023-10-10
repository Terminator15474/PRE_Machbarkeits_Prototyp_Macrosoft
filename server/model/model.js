import mongoose from "mongoose";
import { apartmentSchema } from "./apartment.js";
import { tennantSchema } from "./tennant.js";


export const Tennent = mongoose.model('Tennent', tennantSchema);

export const Apartment = mongoose.model('Appartment', apartmentSchema);