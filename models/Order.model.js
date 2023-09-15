const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
	Products: [{
			product: {
		    type: Schema.Types.ObjectId,
		    ref: "Product",
			},
			amount: Number
	  }]
		// ... total, userName, userAddress
})

module.exports = model('Order', orderSchema);
