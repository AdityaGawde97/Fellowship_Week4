import  React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import ForgotPassword from "./Component/ForgotPassword";
import Dashboard from './Component/Dashboard';

function Routing(){
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/forgotpassword' component={ForgotPassword} />
                <Route path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    );
}

export default Routing;