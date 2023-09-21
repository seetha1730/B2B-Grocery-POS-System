const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.'],
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Firstname is required.'],
    },
    lastName: {
      type: String,
      trim: true,
      required: false,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required.'],
    },
    terms: {
      type: String,
      required: [true, 'Terms is required.'],
    },
    newsletter: {
      type: String,
    },
   isAdmin: {
    type:Boolean,
   default:false 
   },

  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
