const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
	Products: [{
		product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		},
		productName:{
			type:String
		},
		quantity:{
			type:String
		}
    }],
	  total: {
		type: Number,
	  },
	  customerFirstName:{
		type: String,
	  },
	  customerLastName:{
		type: String,
	  },
	  customerPhoneNumber: {
		type: Number, 
	  },
	  customerId: {
		type:Number
	  },
	  orderNumber:{
		type:Number
	  },
	  orderDate: {
		type: Date,  
		default: Date.now 
	  }
	 

		
})

module.exports = model('Order', ordersSchema);
