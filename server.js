const express = require("express");
const mongoose = require("mongoose");


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/schedule", {
    useMongoClient: true
});

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error with mongoose");
});

db.once("open", () => {
    console.log("Mongoose started successfully started");
});

const app = express();


const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.json({ msg: "Ok" });
});


app.listen(PORT, () => {
    console.log("Server is starting at port ", PORT);
});