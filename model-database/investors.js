require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");




//for users collection
const investorsSchema = mongoose.Schema({
 address: {type: String, required: true},
 txhash: [{type: String, required: true}],
 mkt: {type: Number}
},
{ timestamps: true }
);


 module.exports = {
   Investors: mongoose.model("Investors", investorsSchema),
 }
