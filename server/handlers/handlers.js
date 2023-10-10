import pkg from 'express';


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
export function appartmentHandler(req, res) {
    let id = req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(200);
}