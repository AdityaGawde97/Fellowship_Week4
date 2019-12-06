import  React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './Component/SignIn';
import SignUp from './Component/SignUp';
import Welcome from "./Component/Welcome";

function Routing(){
    return(
        <Router>
            <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/welcome' component={Welcome} />
            </Switch>
        </Router>
    );
}

export default Routing;