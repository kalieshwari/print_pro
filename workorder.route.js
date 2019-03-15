const express = require('express');
const workorderRoutes = express.Router();

let WorkOrder =require('../models/workorder.model');

workorderRoutes.route('/').get(function (req, res) {
    WorkOrder.find(function (err, workorder){
        if (err) {
            console.log(err);
          }
          else {
        res.json(workorder);
          }
    });
  });
  workorderRoutes.route('/print/:id').get(function (req, res) {
    let id = req.params.id;
    WorkOrder.findById(id, function (err, workorder) {
      res.json(workorder);
    });
  });

  workorderRoutes.route('/item_infok').get(function (req, res)
  {
    MongoClient.connect(url, (err, client) => {
      var db = client.db(dbname);
         db.collection('vehicletype').count(function (err, count) {
         if (err) throw err;          
         console.log('Total Rows333: ' + count);
        res.json(count);
        
       });
   }); 

  });


  // Defined store route
  workorderRoutes.route('/add').post(function (req, res) {
    let workorder = new WorkOrder(req.body);
    workorder.save()
      .then(workorder => {
        res.status(200).json({'workorder': 'work order in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });


workorderRoutes.get('/:orderno', (req, res) =>{  
   var order_no= (req.query.orderno); 
     //Product.findOne({product_name: product_name}, function(err, product) { 
     //http://localhost:3000/products/getproduct/?product_name=samsung
     //http://localhost:4200/workorder/orders/?orderno=2
    WorkOrder.findOne({orderNo: order_no},function (err, workorder){
        if (err) {
            console.log(err);
          }
          else {
        res.json(workorder);
          }
    });
  });

  


module.exports = workorderRoutes;

