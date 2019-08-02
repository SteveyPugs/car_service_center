import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import SignIn from './User/SignIn';
import Forgot from './User/Forgot/Forgot';
import ForgotConfirmation from './User/Forgot/ForgotConfirmation';
import AppointmentSearch from './Appointment/Search';
import AppointmentNew from './Appointment/New/New';
import AppointmentEdit from './Appointment/Edit/Edit';
import NoMatch from './NoMatch/NoMatch';

class App extends Component {
    state = {
        authenticated: false
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <Route path="/forgot" exact component={Forgot} />
                        <Route path="/forgot-step-2" exact component={ForgotConfirmation} />
                        <PrivateRoute authenticated={this.state.authenticated} path="/appointments" exact component={AppointmentSearch} />
                        <PrivateRoute authenticated={this.state.authenticated} path="/appointment/new" exact component={AppointmentNew} />
                        <PrivateRoute authenticated={this.state.authenticated} path="/appointment/edit" exact component={AppointmentEdit} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function PrivateRoute ({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated ? <Component {...props} /> : <Redirect to={{
                pathname: '/',
                state: {
                    from: props.location
                }
            }} />}
        />
    )
}

export default App;