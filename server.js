require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const Investors = require("./model-database/investors").Investors;
const Poolprogress = require("./model-database/poolprogress").Poolprogress;
const mongoose = require("mongoose");




const app = express();



app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())











app.get("/",  function(req, res){
  res.send("welcome");
});





app.get("/poolprogress",  async function(req, res){

 const info = await Poolprogress.find();
  res.status(200).json({status: true, data : info[0].pool});

});


app.get("/investor/:address",  async function(req, res){

  const findInvestor = await Investors.findOne({address: req.params.address});
  if(!findInvestor) return  res.status(402).json({ status: false, message: "user not registered"});

   return res.status(200).json({status: true, data: findInvestor});
 
 });


//save investor
app.post("/addinvestor", async function(req, res){
    console.log(req.body);
    try{ 
      //update sender   
      const findInvestor = await Investors.findOne({address: req.body.address});
      let response;
      if(!findInvestor) {
        let investor = new Investors({
          address: req.body.address,
          txhash: [req.body.txhash],
          mkt: req.body.mkt
          });
        
        response = await investor.save();
      
      } else  {

        response = await Investors.findOneAndUpdate(
          {address: req.body.address},
          {
            $inc: {mkt: req.body.mkt},
            $push: {txhash: req.body.txhash}
          },
          {new: true}
        )

      }

      //update pool
      await Poolprogress.updateOne({}, { $inc: { pool: req.body.usdt } });

      
       if(response) return res.status(200).json({status: true, data: response});
  
      } catch(error) {
        console.log(error);
      res.status(402).json({status: false, message: "error"});
      }
    
    
  
    });


  




    //ini my database
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Vreality",
    })
    .then(() => {
      console.log("Database Connection is ready...");
    })
    .catch((err) => {
      console.log(err);
    });





  app.listen(process.env.PORT || 8000,  function(){
    console.log("App is listening on url http://localhost:8000");
  });
