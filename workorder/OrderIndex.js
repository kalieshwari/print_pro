import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
//import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
//import { MdComment } from 'react-icons/lib/md';
const tableTypes = ['', 'bordered', 'striped', 'hover'];
var dot = require('dot-object');
const today = new Date();

export default class OrderIndex extends React.Component {
 
    constructor(props) {
        super(props);
           
        this.state = {
        workorder: [], 
        orderNo: '',
        orderDate: '',
        customerName:'',
        vehicleNumber:'',
        item:[],
        itemId:[],
        price:'',
        transactionId:'',
        status:'',
        redirect: false,        
        };
        this.PopulateOrders=this.PopulateOrders.bind(this);
      }
      PopulateOrders(){
        axios.get('/workorder')
        .then(res => {
          const workorder = res.data;
          this.setState({ workorder });
        })
       }
       
      componentDidMount(){
        const obj = {
            orderNo: '',
            orderDate: '',
            customerName:'',
            vehicleNumber:'',
            item:[],
            itemId:[],
            price:'',
            transactionId:'',
            status:'',       
          };         

        axios.get('/order_no')
       .then(res=>
        {                 
          // console.log("Status:", jsonContent.statusText);
          // console.log(localStorage.getItem('payment_status'));
         if(localStorage.getItem('save_flag')==='true')
         {
          var jsonContent = JSON.parse(localStorage.getItem('payment_status'));
          var tgt = dot.dot(jsonContent);
         // var today =new Date();
         // var dd=today.getDate();
         // var mm =today.getMonth()+1;
         // var yyyy=today.getFullYear();
         // if(dd<10){
         //   dd='0'+dd;
         // }
        //  if(mm<10){
          //  mm='0'+mm;
         // }
         // today=dd+'/'+mm+'/'+yyyy;
         // console.log(today);
          const tres=res.data;
          const obj ={
            orderNo:res.data+1,
            orderDate:today.toLocaleDateString(),                    
            customerName:localStorage.getItem('customer_name'),
            vehicleNumber:localStorage.getItem('vehicle_number'),
            item:localStorage.getItem('package_name'),
            itemId:localStorage.getItem('package_id'),
            price:localStorage.getItem('total_price'),
            transactionId:tgt["data.success.id"],
            status:'Pending'
           }  
          axios.post('/workorder/add', obj)
          .then(() => localStorage.setItem('save_flag','false'));          
         }
          // console.log(`The values are ${this.state.orderNo}, ${this.state.orderDate}, ${this.state.customerName}, ${this.state.vehicleNumber}, ${this.state.item}, ${this.state.itemId}, ${this.state.price}, ${this.state.transactionId}, ${this.state.status}`)        
        }
       )
       //console.log(response);
       axios.get('/workorder')
       .then(res => {
         const workorder = res.data;
         this.setState({ workorder });
       })
     // this.PopulateOrders;
      }    
       render() {
          let i = 1; 
         // this.PopulateOrders;
         axios.get('/workorder')
         .then(res => {
           const workorder = res.data;
           this.setState({ workorder });
         })
         const { redirect } = this.state;
            if (redirect) {
                return <Redirect to="/dashboard" />;                
            }

          //const  { workorder } = this.state;
          return (
            <Page title="Work Order" breadcrumbs={[{name:'List',active: true }]}>                
               <Row>
                <Col xl={12} lg={12} md={12}>
                <Card>
                 <CardHeader> List </CardHeader>                        
                  <CardBody>
                 <Table id="orderTbl" class="table table-striped table-bordered table-sm">
                  <thead>
                      <tr>
                      <th scope="col">Order No</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Vehicle No.</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody id="IndexCustomerTable">
                    {this.state.workorder.map(result =>
                    <tr>
                    <td>                    
                      {result.orderNo} 
                    </td>
                    <td>
                      {result.orderDate}                     
                    </td>
                    <td>
                     {result.customerName} 
                    </td>
                    <td>
                     {result.vehicleNumber} 
                    </td>
                    <td>
                     {new Intl.NumberFormat('en-US', { 
                    style: 'currency', 
                    currency: 'USD' 
                    }).format(result.price)}                    
                    </td>
                    <td>
                     {result.status} 
                    </td>
                    <td>
                       <Link to={"/print/"+result._id} className="btn btn-primary" target="_blank">Print</Link>                
                    </td>
                    <td>
                      <button onClick={(e) => { if (window.confirm('Are you sure to Change status?')) 
                        (axios.put('/update_order_status/'+result._id))
                        .then(() =>  this.setState({ redirect: true })); }}
                         className="btn btn-danger">Update</button>
                    </td>
                    </tr>
                   )}
                  </tbody>
                  </Table>
                  </CardBody>
                </Card>
                </Col>
                </Row>                 
            </Page>           
          );
      }  
  }