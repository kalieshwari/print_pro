import React from 'react';

import { getColor } from 'utils/colors';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-dom';

import Checkout from '../../components/Checkout';
//import { browserHistory  } from "react-router";

import {
  Card,
  CardBody,
  CardHeader,
 // CardTitle,
  CardGroup,
  //CardDeck,
  Form,
  FormGroup,
  Label,
 // Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
//  Multiselect,
  
} from 'reactstrap';

import {
  MdInsertChart,
  MdBubbleChart,
  MdPieChart,
  MdShowChart,
 // MdPersonPin,
 // MdRateReview,
 // MdThumbUp,
 // MdShare,
  MdAssignment,
  MdAssignmentTurnedIn,
  MdMonetizationOn
} from 'react-icons/lib/md';

//import InfiniteCalendar from 'react-infinite-calendar';

import { Line, Bar } from 'react-chartjs-2';

import {
//  supportTicketsData,
//  productsData,
//  userProgressTableData,
//  avatarsData,
//  todosData,
  chartjs,
} from 'demos/dashboardPage';
import Page from 'components/Page';
import { NumberWidget, IconWidget } from 'components/Widget';
import axios from 'axios';
/*import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import SupportTicket from 'components/SupportTicket';
import ProductMedia from 'components/ProductMedia';
import UserProgressTable from 'components/UserProgressTable';
import { AnnouncementCard, TodosCard } from 'components/Card';
import MapWithBubbles from 'components/MapWithBubbles';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import { strict } from 'assert';*/
const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.handleCnameChange=this.handleCnameChange.bind(this);
    this.handleVnumberChange=this.handleVnumberChange.bind(this);
    this.handletotalPriceChange=this.handletotalPriceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
   
    this.state = {
      packagetypes:[],
      customer_name:'',
      vehicle_number:'',
      total_Price:'',
      package_id:[],
      package_name:[],
      package_name1:[],
      selectOptions: [],      
      pid:[],
      pname:[],
      cname:'',
      vnumber:'',
      listItems:'',
      totalPrice:'',
      ctest:[],
        redirect: false
    };        
}

handleCnameChange(e) {
  this.setState({customer_name: e.target.value});
}
handleVnumberChange(e) {
  this.setState({vehicle_number: e.target.value});
}
handlePackageChange(e) {
  this.setState({package_name: e.selected.value});
}
handletotalPriceChange(e) {
  this.setState({total_Price: e.target.value});
}

handleChange = (e) => {
  let target = e.target
  let name = target.name
  //here
  let value = Array.from(target.selectedOptions, option => option.value);
  let mname = Array.from(target.selectedOptions, option => option.text);
  this.setState({
    [name]: value,
    package_id: value,
    package_name:mname
  });
  //var query = {first_name : 'Kumaresan' }; 
 // axios.get('/customer/edit/'+this.props.match.params.id)  
  console.log("cname: " + this.state.customer_name);
  console.log("vnumber: " + this.state.vehicle_number);
  console.log("Package Id: " + this.state.package_id);
  console.log("Package Name: " + this.state.package_name);  
}
onSubmit(event) { 
  event.preventDefault();  
}

goBack(){
  this.props.history.push('/dashboard');
}
componentDidMount() {
      localStorage.getItem('package_id')&&this.setState({pid:localStorage.getItem('package_id')});
      localStorage.getItem('package_name')&&this.setState({pname:localStorage.getItem('package_name')})
      localStorage.getItem('customer_name')&&this.setState({cname:localStorage.getItem('customer_name')})
      localStorage.getItem('vehicle_number')&&this.setState({vnumber:localStorage.getItem('vehicle_number')})
      const pamount=(localStorage.getItem('package_name')).match(/\d+(?:\.\d+)?/g).map(Number);
      
     // const pamount=JSON.stringify((localStorage.getItem('package_name')).match(/\d+(?:\.\d+)?/g));
     // const [name, street, unit, city, state, zip] = input.split('~');
     // const input = 'krunallathiya~25 ankitlathiya~24 rushabhrupani~12345';
     // const input='Linchu , Price 12345$    ,Kumaresan , Price 77899$';
     // const resinput = input.split('$');
     // const res =bscname.split(/[ \(,\)]+/) ;
     // const numbers1 = [1, 2, 3, 4, 5];
     // const listItems = numbers.map((number) =><li>{number}</li>);
     // console.log(resinput);
     // var str = "ghjkhjgbkhj123.45khgbkhjgk67   8kjhgkj hg13.99sads";
     // const array1 = [1, 2, 3, 4];
     
     const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log(pamount.reduce(reducer));
     const total_Price=parseFloat(pamount.reduce(reducer)).toFixed(2);
      this.setState({
       totalPrice:total_Price
     })
     localStorage.setItem('total_price',parseFloat(pamount.reduce(reducer)).toFixed(2));
       axios.get('/customer')
      .then(res => console.log(res.data));
    
      //Dashboard Statistics Start
      axios.get('/complete_order_no')
      .then(res=>
       {
         const ono=res.data;
         this.setState({ ono });
       });
       axios.get('/pending_order_no')
      .then(res=>
       {
         const pono=res.data;
         this.setState({ pono });
       });       
       axios.get('/sum_sales')
       .then(res=>
        {
          //var tgt = (res.data);
          //const tsale=(JSON.stringify(res.data)); 
          var tsale = (res.data);
           var rtsale=tsale[0]["sum"];        
          this.setState({ rtsale });
        });
      //Dashboard Statistics End
  }
 
  render() {   
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');
    let pi=1;
    //  const totalPrice=this.state.totalPrice;
  //  const numbers = ['one','two','three','four','five'];
  //  const numbers = this.state.pname;
   // const bscname1=this.state.bscname;
   // const listItems = numbers.map((number) =><li>{number}</li>);
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}>
        <Row hidden>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Orders"
              subtitle="Today"
              number="23"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} hidden>
            <NumberWidget
              title="Bounce Rate"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>
        <Row hidden>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Total Revenue{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Total Expense</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Cost of sales{' '}
                  <Badge color="secondary">$3000</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Management
                  costs <Badge color="secondary">$1200</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Financial costs{' '}
                  <Badge color="secondary">$800</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Other operating
                  costs <Badge color="secondary">$2400</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }} >
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdAssignment}
            title={this.state.pono}
            subtitle="Pending Work Orders"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdAssignmentTurnedIn}
            title={this.state.ono}
            subtitle="Completed Work Orders"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdMonetizationOn}
            title={this.state.rtsale}
            subtitle="Daily Sales"
          />
        </CardGroup>
        <Row>
                <Col xl={12} lg={12} md={12}>
                <Card>
                    <CardHeader> Confirm Work Order </CardHeader>
                    <CardBody>
                      <Form  onSubmit={this.onSubmit}>
                        <Row>
                        <Col xl={4} lg={4} md={4}>
                        <FormGroup>
                        <label>Customer Name: </label>
                        <input type="text" name="cname" className="form-control"
                        value={this.state.cname}
                        onChange={this.handleCnameChange}
                        readOnly
                        />
                        </FormGroup>
                        </Col>
                        <Col xl={4} lg={4} md={4}>
                        <FormGroup>
                        <label>Vehicle Number : </label>
                        <input type="text" name="vnumber" className="form-control"
                        value={this.state.vnumber}
                        onChange={this.handleVnumberChange}
                        readOnly
                        />
                        </FormGroup>
                        </Col>
                        
                        </Row> 
                                            
                        <Row>
                        <Col xl={12} lg={12} md={12}>
                        <FormGroup>
                        <Label > <b>Selected Package : </b> 
                        { 
                          this.state.pname
                        }
                        
                        </Label>
                        
                        </FormGroup> 
                        </Col> 
                       
                        </Row> 
                        
                        <Row>
                        <Col xl={12} lg={12} md={12}>
                        <FormGroup>
                        <Label >Total Price : 
                        <input type="text" name="totalPrice" className="form-control" 
                        value={this.state.totalPrice}
                        onChange={this.handletotalPriceChange}
                        readOnly
                        />                        
                        </Label>                        
                        </FormGroup> 
                        </Col> 
                        </Row>   
                        <Row>
                        <Col xl={6} lg={6} md={6}>
                        <Button onClick={this.goBack}>Cancel</Button>
                        </Col>
                        <Col xl={6} lg={6} md={6}>
                        <Checkout  onClick={this.onSubmit}
                        name={'TIDI Carwash App'}
                        description={this.state.pname}
                        amount={this.state.totalPrice}
                        />
                        </Col>
                        </Row>                    
                        {/*<Button onClick={this.onSubmit}>Confirm Order</Button>*/}
                      
                      </Form>
                    </CardBody>
                </Card>
                </Col>
            </Row>        
      </Page>
    );
  }
}
export default OrderView;
