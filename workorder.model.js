const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Customer
let WorkOrders = new Schema({
    orderNo: {
    type: Number
  },
  orderDate: {
    type: Date 
  },
  customerName:
  {
      type:String
  },
  vehicleNumber:
  {
    type:String
  },
  item:{
       type:Array
  },
  itemId:{
    type:Array
},
transactionId:{
    type:String
},
price:{
    type:Number
},
status:{
    type:String
}  
},{
    collection: 'work_orders'
});

module.exports = mongoose.model('WorkOrders', WorkOrders);