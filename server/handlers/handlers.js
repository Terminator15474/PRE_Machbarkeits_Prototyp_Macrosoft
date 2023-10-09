import pkg from 'express';


/**
* 
* @param {pkg.Response} res 
* @param {pkg.Request} req 
*/
export function indexHandler(req, res) {
    res.send("Hello World");
}
