import express from "express";
import {Client} from "mongodb";

const app = express();

app.get('/', (req, res) => {
    res.send("Not Found").status(404);
});

app.listen(8080, () => {
    console.log("Starting server on port 8080");
});