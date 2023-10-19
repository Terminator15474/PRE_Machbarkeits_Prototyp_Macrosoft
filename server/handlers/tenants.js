import express from 'express';
import { Tenant } from '../model/model.js';

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
