const mongoose = require('mongoose');

// Define the StoreAddress schema
const storeAddressSchema = new mongoose.Schema({
   
  storeName: {
    type: String,
    required: true,
  },
  addressLine1: String,
  addressLine2: String,
  pincode: String,
  country: String,
  state:String,
  updatedAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});


module.exports = mongoose.model('StoreAddress', storeAddressSchema);

