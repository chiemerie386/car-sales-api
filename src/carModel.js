// import mongoose, { Schema } from 'mongoose';

const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const carSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },
    price: {
      type: String,
      trim: true,
      required: [true, 'amount is required'],
    },
    make: {
      type: String,
      trim: true,
      required: [true, 'validity is required'],
    },
    year: {
      type: String,
      trim: true,
    },
    image: {
        type: String,
        trim: true,
      },
  },
  { timestamps: true }
);

const Car = mongoose.model('Cars', carSchema);

// export default Car;
module.exports = Car
