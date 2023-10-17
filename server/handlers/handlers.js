import express from 'express';
import { Apartment, Tenant, User } from '../model/model.js';
import mongoose from 'mongoose';


/**
* 
* @param {express.Response} res 
* @param {express.Request} req
*/
export function indexHandler(req, res) {
    res.send("Hello World");
}

/**
* Handler for the /api/apartments/<id> route
* @param {express.Response} res 
* @param {express.Request} req 
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

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function getAllTennentsHandler(req, res) {
    let tennents = await Tenant.find({});
    tennents.forEach(e => e.toJSON());
    res.send(tennents);
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function getOneTenantHandler(req, res) {
    let id = Number.parseInt(req.params.id);

    if (!id) {
        res.status(400).send({ reason: "no id provided or id is not a number" });
        return;
    }

    let tenant = await Tenant.findOne({ id: id });

    res.send(tenant.toJSON());
}

/**
 * request body layout
 * {
 *  apartment_id: <int>,
 *  tenant_id: <int>,
 *  lease_start: <date>,
 *  lease_end: <date>,
 * }
 * 
 * Date format should be YYYY-MM-DD
 * so e.g -> 2023-10-03 or 2024-01-03
 * The padding is important, or otherwise parsing will be off
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function linkTenantToApartmentHandler(req, res) {
    let apartmentId = Number.parseInt(req.body.apartment_id);
    let tenantId = Number.parseInt(req.body.tenant_id);
    let leaseStart = new Date(req.body.lease_start);
    let leaseEnd = new Date(req.body.lease_end);

    if (!apartmentId || !tenantId || leaseStart == "Invalid Date" || leaseEnd == "Invalid Date") {
        res.status(400).send({ reason: "malformed body" });
        return;
    }

    let apartment = await Apartment.findOne({ id: apartmentId });

    if (!apartment) {
        res.status(400).send({ reason: "invalid apartment id" });
        return;
    }

    apartment.populate("tennents.tennent");

    let tenant = await Tenant.findOne({ id: tenantId });

    if (!tenant) {
        res.status(400).send({ reson: "invalid tenant id" });
    }

    let datesOverlap = false;

    let leaseStartTime = leaseStart.getTime();
    let leaseEndTime = leaseEnd.getTime();


    for (let i = 0; i < apartment.tennents.length; i++) {
        let entry = apartment.tennents[i];
        let existingLeaseStartTime = new Date(entry.leaseStart.toISOString().split("T")[0]).getTime();
        let exisitingLeaseEndTime = new Date(entry.leaseEnd.toISOString().split("T")[0]).getTime();

        if (leaseStartTime >= existingLeaseStartTime && leaseStartTime <= exisitingLeaseEndTime) {
            datesOverlap = true;
            break;
        }

        if (leaseEndTime >= existingLeaseStartTime && leaseEndTime <= exisitingLeaseEndTime) {
            datesOverlap = true;
            break;
        }

        if (leaseStartTime <= existingLeaseStartTime && !(leaseEndTime < existingLeaseStartTime)) {
            datesOverlap = true;
            break;
        }
    }

    if (datesOverlap) {
        res.status(400).send({ reason: "dates overlap with exisiting entry" });
        return;
    }

    let userApartments = await Apartment.find({ tennents: { $elemMatch: { tennent: tenant._id } } });
    if (userApartments.length != 0) {
        let datesOverlap = false;
        userApartments.forEach(async e => await e.populate("tennents.tennent"));

        userApartments.forEach(e => {
            let exisitingEntries = e.tennents.filter(f => f.tennent.equals(tenant._id));
            exisitingEntries.forEach(g => {
                let existingLeaseStartTime = new Date(g.leaseStart.toISOString().split("T")[0]).getTime();
                let exisitingLeaseEndTime = new Date(g.leaseEnd.toISOString().split("T")[0]).getTime();
                if (leaseStartTime >= existingLeaseStartTime && leaseStartTime <= exisitingLeaseEndTime) {
                    datesOverlap = true;
                    console.log("DATES OVERLAP");
                }

                if (leaseEndTime >= existingLeaseStartTime && leaseEndTime <= exisitingLeaseEndTime) {
                    datesOverlap = true;
                    console.log("DATES OVERLAP");
                }

                if (leaseStartTime <= existingLeaseStartTime && !(leaseEndTime < existingLeaseStartTime)) {
                    datesOverlap = true;
                }
            })
        });

        if (datesOverlap) {
            res.status(400).send({ reason: "dates overlap with exisiting entry in another apartment" });
            return;
        }
    }

    apartment.tennents.push({
        emailSent: false,
        tennent: tenant._id,
        leaseStart: leaseStart,
        leaseEnd: leaseEnd,
    });

    let response = await apartment.save();

    if (!response) {
        res.sendStatus(500);
        return;
    }

    res.sendStatus(200);
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function listAllUsersHandlers(req, res) {
    let users = await User.find({}).select("-password");
    res.send(users);
}


/**
 * Handler for the route /api/create_user
 * 
 * body format: {
 *  username: <String>,
 *  email: <String>,
 * }
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export async function createUserHandler(req, res) {
    let username = String(req.body.username);
    let email = String(req.body.email);

    if (!username || !email) {
        res.status(400).send({ reason: "malformed body" });
        return;
    }

    let maxUserId = -1;

    let userWithMaxId = await User.find({});
    if (userWithMaxId.length != 0) {
        userWithMaxId.sort((e1, e2) => e1.id < e2.id);
        maxUserId = Number(userWithMaxId[0].id);
    }


    maxUserId++;

    let newUser = new User({
        id: maxUserId,
        username: username,
        email: email,
        confirmedUser: false,
    });

    await newUser.save();
    // TODO: A way to send an email to the user + save into pending users for a way to confirm and set password

    res.sendStatus(200);
}
