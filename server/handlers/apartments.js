import { Apartment } from "../model/model.js";

/**
* Handler for the /api/apartments/<id> route
* @param {express.Response} res 
* @param {express.Request} req 
*/
export async function getApartmentHandler(req, res) {
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

    res.send(found);
}
/**
* Handler for the /api/apartments/ route
* @param {express.Response} res 
* @param {express.Request} req 
*/
export async function getAllApartmentsHandler(req, res) {
    let found = await Apartment.find({});
    for (let i = 0; i < found.length; i++) {
        await found[i].populate("tennents.tennent");
    }
    res.send(found);
}

/**
* Handler for the /api/get_occupents?apartment_id=<>&start_date=<>&end_date=<>
* @param {express.Response} res 
* @param {express.Request} req 
*/
export async function occupiedHandler(req, res) {
    let start = req.query.start_date;
    let end = req.query.end_date;
    let apartmentId = Number.parseInt(req.query.apartment_id);

    if (!start || !end || !apartmentId) {
        res.status(400).send({
            reason: "missing url atributes"
        });
        return;
    }

    let startDate = new Date(start);
    let endDate = new Date(end);

    if (!startDate || !endDate) {
        res.status(400).send({ reason: "malformed date" });
        return;
    }

    startDate = new Date(startDate.toISOString().split("T")[0]);
    endDate = new Date(endDate.toISOString().split("T")[0]);

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

    /**
     * 
     * @param {Date} start 
     * @param {Date} end 
     */
    var getDaysArray = function (start, end) {
        const dayInMs = 24 * 60 * 60 * 1000;
        let array = [];
        let date = new Date(start);
        let endDate = new Date(end);
        while (date.getTime() <= endDate.getTime()) {
            array.push(date);
            date = new Date(date.getTime() + dayInMs);
        }
        return array;
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
            if (tennant == undefined) continue;
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