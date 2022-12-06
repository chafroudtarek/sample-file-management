const mongoose = require("mongoose");
const { Schema, model } = mongoose;



const DocSchema = new Schema({
  filename: {
    type: String,
  },
 
  size: String,
  archived:{
    type:Boolean,
    default: false
  },
  DateArchived:{
    type: Date,
  },
starred:{
  type:Boolean,
  default: false
},
DateStarred:{
  type: Date,
},

}, { timestamps: true });





const Doc = model("Doc", DocSchema);
module.exports = Doc;
