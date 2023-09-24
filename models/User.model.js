const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    },
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
    phoneNumber: {
      type: Number,
      required: [true, 'Phone number  is required.'],
    },
  customerId :{
    type:Number,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['Customer', 'Cashier'],
      default: 'Customer', 
    },

  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
