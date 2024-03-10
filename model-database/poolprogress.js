require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");




//for investors collection
const poolprogressSchema = mongoose.Schema({
 pool: {type: Number, required: true, default: 0},
});



 module.exports = {
   Poolprogress: mongoose.model("Poolprogress", poolprogressSchema),
 }
