const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  currency: String,
  defaultCustomer: String,
  isinclusiveTax: Boolean
});

module.exports  = mongoose.model('Settings', settingsSchema);


