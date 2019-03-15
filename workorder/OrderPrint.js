import React, {Component} from 'react';
//import { PDFExport } from '@progress/kendo-react-pdf';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
 // FormGroup,
 // Label,
 // Input,
  Table,
  //FormText,
 // FormFeedback,
} from 'reactstrap';

import Page from 'components/Page';
export default class print extends Component { 
//const FormPage = () => {
  constructor(props) {
    super();
     this.state = {
     redirect: false
    };
  
super(props);
    this.state = {
  //    workorders:[]
      orderNo: '',
      orderDate: '',
      customerName: '',
      vehicleNumber: '',
      item: '',
      itemId: '',
      price: '',
      transactionId: '',
      status: ''
    }
  }
  print(){
    window.print();
  }
componentDidMount() {
  window.scrollTo(0, 0);
  axios.get('workorder/print/'+ this.props.match.params.id)
    .then(response => {
      console.log(response.data);
     this.setState({
      orderNo: response.data.orderNo,
       orderDate: response.data.orderDate,
       customerName: response.data.customerName,
       vehicleNumber: response.data.vehicleNumber,
       item: response.data.item,
       itemId: response.data.itemId,
       price: response.data.price,
       transactionId: response.data.transactionId,
       status: response.data.status  
       
      });
    })
    .catch(function (error) {
      console.log(error);
    })
}
render(){
  return (   
    <Page>
       <div style={{ height: '100vh', width: '100vw', paddingTop: 10, backgroundColor: 'gray' }}>      
          <Row>
        <Col xl={12 } lg={12} md={12}>
          <Card>
            <CardHeader>AutoSplash Car Wash</CardHeader>
            <CardBody>
              <Form>     
                <Table>
                  <tr>
                    <th scope="col" colspan="6">OrderNo:{this.state.orderNo} </th>  
                    <th scope="col" colspan="6">Date:{this.state.orderDate} </th>
                  </tr>
                  <tr>
                    <th scope="col" colspan="6">CustomerName:{this.state.customerName} </th>  
                    <th scope="col" colspan="6">Vehicle Number:{this.state.vehicleNumber} </th>
                  </tr>                  
                </Table>          
                <Table class="table">
                <thead class="thead-dark">
                <tr>
                  <th scope="col" colspan="6" class='centerme'>Item</th>                  
                  <th scope="col"  colspan="3" class='centerme'>Price</th>
                  <th scope="col" colspan="3" class='centerme'>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td> {this.state.item}  </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                
                  <td> {this.state.price}   </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                
                  <td >{this.state.status}  </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                </tbody>
            </Table>
      
            <div class="col-md-4">
                <Button type="button" id="print-pdf" class="btn btn-block btn-primary " onClick={() => window.print()}>
                  <span class="btn-inner--visible">Print</span>
                  <span class="btn-inner--hidden">
                    <i class="fas fa-print"></i>
                  </span>
                </Button>
              </div>                
              </Form>
            </CardBody>
          </Card>
        </Col>        
      </Row>
     </div>      
    </Page>
  );
}};
/*<tr>
<th scope="col" colspan="6">Item Id:{this.state.itemId} </th>  
<th scope="col" colspan="6">Transaction Id:{this.state.transactionId} </th>
</tr>*/