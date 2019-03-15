const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const config = require('./database/DB');
const customerRoutes =require('./routes/customer.route');
const vehicletypeRoute=require('./routes/VehicleType.route');
const servicetypeRoute=require('./routes/servicetype.route');
const servicestationRoute=require('./routes/servicestation.route');
const dashboardRoutes=require('./routes/dashboard.route');
const workorderRoutes=require('./routes/workorder.route');
const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017'; // remove the db name.
var dbname='mlogin';
app.set('view engine', 'ejs')
const {ObjectId} = require('mongodb');
const packagetypeRoute=require('./routes/packagetype.route');
//const productRoutes=require('./routes/productRoutes');
//const SERVER_CONFIGS = require('../backend/constants/server');
//const configureServer = require('../backend/server');
//const configureRoutes = require('../backend/routes');


mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
});



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/item_info', (req, res) =>
    {
      MongoClient.connect(url, (err, client) => {
        var db = client.db(dbname);
        db.collection('customer').find({}).toArray(function(err, docs) {
         // Print the documents returned
         //res.send("<p>Documents!</p>" + docs);
         docs.forEach(function(doc) {
             console.log(doc);
         });
         // Close the DB         
         client.close();
         });

         db.collection('vehicletype').count(function (err, count) {
           if (err) throw err;          
           console.log('Total Rows From Server : ' + count);
           res.json(count);           
         });
     });      
    });

    app.get('/order_no', (req, res) =>
    {
      MongoClient.connect(url, (err, client) => {
        var db = client.db(dbname);
           db.collection('work_orders').count(function (err, count) {
           if (err) throw err;          
            res.json(count);           
         });
     });      
    });
    app.get('/pending_order_no', (req, res) =>
    {
      MongoClient.connect(url, (err, client) => {
        var db = client.db(dbname);
           db.collection('work_orders').find({status:'Pending'}).count(function (err, count) {
           if (err) throw err;          
            res.json(count);           
         });
     });      
    });
    app.get('/complete_order_no', (req, res) =>
    {
      MongoClient.connect(url, (err, client) => {
        var db = client.db(dbname);
           db.collection('work_orders').find({status:'Complete'}).count(function (err, count) {
           if (err) throw err;          
            res.json(count);           
         });
     });      
    });

    app.get('/sum_sales', (req, res) =>
    {
      MongoClient.connect(url, (err, client) => {
        var db = client.db(dbname);
          db.collection('work_orders').aggregate([{$group:{_id:null,sum:{$sum:"$price"}}}]).toArray(function (err, count) {
          
            if (err) throw err;          
            res.send(count); 
                    
         });
     });      
    });    
    //http://localhost:4200/delete-order/KL12CK1234
    app.get('/delete-order/:id', (req, res) => {
      MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
      var db = client.db(dbname);      
      var oid=req.params.id;     
      db.collection('work_orders')
      .deleteOne({"_id": ObjectId(oid)},(err) => {
        if(err) res.json(err);                 
      })
    })
    })

    /////http://localhost:4200/update_order_status/orders/orders?orderno=12
   /* app.put('/update_order_status/:orderno', (req, res) =>
    {
          MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
          var db = client.db(dbname);
          order_no= (req.query.orderno); 
          db.collection('work_orders')
          .findOneAndUpdate({order_no}, {
            $set: {
              status : "Pending"         
            }
          }, {
            sort: {_id: -1},
            upsert: false
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          })
        })    
    })*/

  /*
  mongoDbObj.students.update({studentId:1},{$set: {name:”Ravi Kiran”}},{w:1}, function(err, result){
  //Handle success and failure
});
  */
    app.put('/update_order_status/:ono', (req, res) => {
      MongoClient.connect(url,{useNewUrlParser:true}, (err, client) => {
      var db = client.db(dbname);
      var oid = 2;
      var orderid =req.params.ono;
       db.collection('work_orders')
      .updateOne({"_id" : ObjectId(orderid)}, {$set: { "status" : "Complete" }},{}, (err, result) => {
        if (err) return res.json(err)
        //res.json(result)
       // res.redirect("/workorderlist")
      })
    })
    })

app.use('/customer', customerRoutes);
app.use('/vehicletype',vehicletypeRoute);
app.use('/service', servicetypeRoute);
app.use('/station', servicestationRoute);
app.use('/packages',dashboardRoutes);
app.use('/workorder',workorderRoutes);
//app.use('/product',productRoutes);
app.use('/packagetype',packagetypeRoute);


app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});