import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import './App.css';
import SignIn from './User/SignIn';
import Forgot from './User/Forgot/Forgot';
import ForgotConfirmation from './User/Forgot/ForgotConfirmation';
import AppointmentSearch from './Appointment/Search';
import AppointmentNew from './Appointment/New/New';
import AppointmentEdit from './Appointment/Edit/Edit';
import NoMatch from './NoMatch/NoMatch';
const cookies = new Cookies();

class App extends Component {
    loginUser = () => {
        let randomSeq =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        cookies.set('fe_cookie', randomSeq, {
            path: '/'
        });
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact render={props => <SignIn loginUser = {this.loginUser} />} />
                        <Route path="/forgot" exact component={Forgot} />
                        <Route path="/forgot-step-2" exact component={ForgotConfirmation} />
                        <PrivateRoute path="/appointments" exact component={AppointmentSearch} />
                        <PrivateRoute path="/appointment/new" exact component={AppointmentNew} />
                        <PrivateRoute path="/appointment/edit" exact component={AppointmentEdit} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function PrivateRoute ({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => cookies.get('fe_cookie') ? <Component {...props} /> : <Redirect to={{
                pathname: '/',
                state: {
                    from: props.location
                }
            }} />}
        />
    )
}

export default App;