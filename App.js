import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import AlertPage from 'pages/AlertPage';
import AuthModalPage from 'pages/AuthModalPage';
import AuthPage from 'pages/AuthPage';
import BadgePage from 'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import ChartPage from 'pages/ChartPage';
// pages
import CustomerCreate from 'pages/customer/CustomerCreate';
import CustomerList from 'pages/customer/CustomerIndex';
import CustomerEdit from 'pages/customer/CustomerEdit';
import CreateVehicleType from 'pages/vehicletype/VehicleTypeCreate';
import EditVehicleType from 'pages/vehicletype/VehicleTypeEdit';
import IndexVehicleType from 'pages/vehicletype/VehicleTypeIndex';
import CreateServiceType from 'pages/servicetype/ServicetypeCreate';
import EditServiceType from 'pages/servicetype/ServicetypeEdit';
import IndexServiceType from 'pages/servicetype/ServicetypeIndex';
import CreateServiceStation from 'pages/servicestation/ServicestationCreate';
import EditServiceStation from 'pages/servicestation/ServicestationEdit';
import IndexServiceStation from 'pages/servicestation/ServicestationIndex';
import CustomerVehicleAdd from 'pages/customervehicle/CustomerVehicleAdd';
import OrderView from 'pages/workorder/OrderView';
import OrderIndex from 'pages/workorder/OrderIndex';
import OrderPrint from 'pages/workorder/OrderPrint';
import CreatePackageType from 'pages/packagetype/PackageTypeCreate';
import EditPackageType from 'pages/packagetype/PackageTypeEdit';
import IndexPackageType from 'pages/packagetype/PackageTypeIndex';

import DashboardPage from 'pages/DashboardPage';
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.css';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() 
  
  { 
    
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
            <LayoutRoute
              exact
              path="/login-modal"
              layout={MainLayout}
              component={AuthModalPage}
            />

            <LayoutRoute
            exact 
            path="/order-view" 
            layout={MainLayout}
            component={OrderView}
            />
            <LayoutRoute
            exact 
            path="/print/:id" 
            layout={EmptyLayout}
            component={OrderPrint}
            />
            
            <LayoutRoute
            exact 
            path="/customers" 
            layout={MainLayout}
            component={CustomerCreate}
            />
            <LayoutRoute
            exact 
            path="/editcustomer/:id" 
            layout={MainLayout}
            component={CustomerEdit}
            />
            <LayoutRoute
            exact 
            path="/customers-list" 
            layout={MainLayout}
            component={CustomerList}
            />
            <LayoutRoute
              exact
              path="/create_vehicletype"
              layout={MainLayout}
              component={CreateVehicleType}
            />
            <LayoutRoute
              exact
              path="/edit_vehicletype/:id"
              layout={MainLayout}
              component={EditVehicleType}
            />
            <LayoutRoute
            exact 
            path="/vehicle-type-list" 
            layout={MainLayout}
            component={IndexVehicleType}
            />
            <LayoutRoute
            exact 
            path="/create_service" 
            layout={MainLayout}
            component={CreateServiceType}
            />
            <LayoutRoute
            exact 
            path="/edit_service/:id"
            layout={MainLayout}
            component={EditServiceType}
            />            
            <LayoutRoute
            exact 
            path="/service-type-list" 
            layout={MainLayout}
            component={IndexServiceType}
            />
            <LayoutRoute
            exact 
            path="/create_servicestation" 
            layout={MainLayout}
            component={CreateServiceStation}
            />
            <LayoutRoute
            exact 
            path="/edit_servicestation/:id" 
            layout={MainLayout}
            component={EditServiceStation}
            />
            <LayoutRoute
            exact 
            path="/service-station-list" 
            layout={MainLayout}
            component={IndexServiceStation}
            />
            <LayoutRoute
            exact 
            path="/customer-vehicle-add" 
            layout={MainLayout}
            component={CustomerVehicleAdd}
            />


            <LayoutRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={DashboardPage}
            />
            <LayoutRoute
              exact
              path="/workorderlist"
              layout={MainLayout}
              component={OrderIndex}
            />
                        <LayoutRoute
              exact
              path="/create_packagetype"
              layout={MainLayout}
              component={CreatePackageType}
            />
             <LayoutRoute
              exact
              path="/edit_packagetype/:id"
              layout={MainLayout}
              component={EditPackageType}
            />
            <LayoutRoute
              exact
              path="/package-type-list"
              layout={MainLayout}
              component={IndexPackageType}
            />
            <LayoutRoute
              exact
              path="/buttons"
              layout={MainLayout}
              component={ButtonPage}
            />
            <LayoutRoute
              exact
              path="/cards"
              layout={MainLayout}
              component={CardPage}
            />
            <LayoutRoute
              exact
              path="/widgets"
              layout={MainLayout}
              component={WidgetPage}
            />
            <LayoutRoute
              exact
              path="/typography"
              layout={MainLayout}
              component={TypographyPage}
            />
            <LayoutRoute
              exact
              path="/alerts"
              layout={MainLayout}
              component={AlertPage}
            />
            <LayoutRoute
              exact
              path="/tables"
              layout={MainLayout}
              component={TablePage}
            />
            <LayoutRoute
              exact
              path="/badges"
              layout={MainLayout}
              component={BadgePage}
            />
            <LayoutRoute
              exact
              path="/button-groups"
              layout={MainLayout}
              component={ButtonGroupPage}
            />
            <LayoutRoute
              exact
              path="/dropdowns"
              layout={MainLayout}
              component={DropdownPage}
            />
            <LayoutRoute
              exact
              path="/progress"
              layout={MainLayout}
              component={ProgressPage}
            />
            <LayoutRoute
              exact
              path="/modals"
              layout={MainLayout}
              component={ModalPage}
            />
            <LayoutRoute
              exact
              path="/forms"
              layout={MainLayout}
              component={FormPage}
            />
            <LayoutRoute
              exact
              path="/input-groups"
              layout={MainLayout}
              component={InputGroupPage}
            />
            <LayoutRoute
              exact
              path="/charts"
              layout={MainLayout}
              component={ChartPage}
            />
            <LayoutRoute
              exact
              path="/register"
              layout={MainLayout}
              component={AuthPage}
            />
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
