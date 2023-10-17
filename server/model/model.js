import mongoose from "mongoose";
import { apartmentSchema } from "./apartment.js";
import { tenantSchema } from "./tenant.js";
import { userSchema } from "./user.js";
import { pendingUserSchema } from "./pendingUser.js";


export const Tenant = mongoose.model('Tennent', tenantSchema);

export const Apartment = mongoose.model('Appartment', apartmentSchema);

export const User = mongoose.model('User', userSchema);

export const PendingUser = mongoose.model("PendingUser", pendingUserSchema);