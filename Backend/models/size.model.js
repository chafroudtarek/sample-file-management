const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { connection } = require("../config/connectDB");

const SizeSchema = new Schema(
  {
    image: {
      maxSize: { type: Number, default: 52428800 },
      currSize: { type: Number, default: 0 },
    },
    document: {
      maxSize: { type: Number, default: 5242880 },
      currSize: { type: Number, default: 0 },
    },

    video: {
      maxSize: { type: Number, default: 5368709120 },
      currSize: { type: Number, default: 0 },
    },
  },
  { capped: true, size: 4000, max: 1 }
);

const Size = model("Size", SizeSchema);
module.exports = Size;
