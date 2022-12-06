const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const { connection } = require("./config/connectDB.js");
dotenv.config({ path: '.env' });
const app = express();
require("dotenv").config();
const fileRouter = require("./routes/file.routes");
const SizeSchema = require("./models/size.model")





app.use(express.json(), cors());




connection.once("open", () => {

    SizeSchema.count(function(err, count) {
        
    
        if( count == 0) {
            const size = new SizeSchema()
            size.save();
        }else {
            return;
        }
        
    });
  
    
  });


app.use("/api/file", fileRouter);



connection.once("open", () => {
  console.log("*** SERVER INIT ***");
});




const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err
    ? console.error(err)
    :console.log(
      `Server started and running on http://${process.env.HOST}:${PORT}`
    )
);
