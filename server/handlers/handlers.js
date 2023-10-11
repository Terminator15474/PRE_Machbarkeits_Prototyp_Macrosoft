import pkg from 'express';
import { Apartment } from '../model/model.js';


/**
* 
* @param {pkg.Response} res 
* @param {pkg.Request} req
*/
export function indexHandler(req, res) {
    res.send("Hello World");
}

/**
* Handler for the /api/apartments/<id> route
* @param {pkg.Response} res 
* @param {pkg.Request} req 
*/
export async function apartmentHandler(req, res) {
    let id = req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    let found = await Apartment.findOne({ id: id });
    if (!found) {
        res.sendStatus(404);
        return;
    }
    await found.populate({ path: "tennents.tennent" });
    console.log(found.toJSON());

    res.send(found);
}
/**
* Handler for the /api/apartments/ route
* @param {pkg.Response} res 
* @param {pkg.Request} req 
*/
export async function getAllApartmentsHandler(req, res) {
    let found = await Apartment.find({});
    console.log(found);
    for (let i = 0; i < found.length; i++) {
        await found[i].populate("tennents.tennent");
    }
    res.send(found);
}

/**
* Handler for the /api/get_occupents?apartment_id=<>&start_date=<>&end_date=<>
* @param {pkg.Response} res 
* @param {pkg.Request} req 
*/
export async function occupiedHandler(req, res) {
    let start = req.params.start_date;
    let end = req.params.end_date;
    let apartmentId = req.params.apartment_id;

    if (!start || !end || !apartmentId) {
        res.status(400).send({
            reason: "missing body atributes"
        });
        return;
    }

    let startDate = new Date(start);
    let endDate = new Date(end);

    if (!startDate || !endDate) {
        res.status(400).send({ reason: "malformed date" });
        return;
    }

    if (startDate.getTime() > endDate.getTime()) {
        res.status(400).send({ reason: "start date must be smaller than end date" });
        return;
    }



    let apartment = await Apartment.findOne({ id: apartmentId });
    if (!apartment) {
        res.status(400).send({ reason: "invalid apartment id" });
        return;
    }

    await apartment.populate("tennents.tennent");

    apartment.tennents.sort((a, b) => a.leaseStart.getTime() < b.leaseStart.getTime());

    let tennants = apartment.tennents;

    var getDaysArray = function (start, end) {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }
        arr.push(new Date(dt));
        return arr;
    };

    let daysBetween = getDaysArray(startDate, endDate);

    let returnObject = {
        days: []
    };

    for (let j = 0; j < daysBetween.length; j++) {
        let day = daysBetween[j];
        let occupied = false;
        for (let i = 0; i < tennants.length; i++) {
            let tennant = tennants[i];
            if (new Date(tennant.leaseStart.toDateString()).getTime() <= day.getTime() && tennant.leaseEnd.getTime() >= day.getTime()) {
                returnObject.days.push({ day: day, occupied: true, tennantName: tennant.tennent.name, tennentId: tennant.tennent.id });
                occupied = true;
            }
        }
        if (!occupied) {
            returnObject.days.push({ day: day, occupied: false });
        }

    }

    res.send(returnObject);
}

