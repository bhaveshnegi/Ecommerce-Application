const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//database connection with mongodb
mongoose.connect("mongodb+srv://bhaveshnegi:kedarnath@cluster0.flnm3.mongodb.net/e-commerce");

//API creation
app.get("/",(req,res)=>{
    res.send("express app is running")
})


app.listen(port, (error) => {
    if (!error) {
        console.log(`server is running on port ${port}`);
    } else {
        console.log(error);
    }
});
