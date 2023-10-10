import mongoose from "mongoose";
import { appartmentModel } from "./appartment.js";

export let appartment = mongoose.model('Appartment', appartmentModel);