import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import SignIn from './User/SignIn';
import Forgot from './User/Forgot/Forgot';
import ForgotConfirmation from './User/Forgot/ForgotConfirmation';
import AppointmentSearch from './Appointment/Search';
import AppointmentEdit from './Appointment/Edit/Edit';
import NoMatch from './NoMatch/NoMatch';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <Route path="/forgot" exact component={Forgot} />
                        <Route path="/forgot-step-2" exact component={ForgotConfirmation} />
                        <Route path="/appointments" exact component={AppointmentSearch} />
                        <Route path="/appointment/edit" exact component={AppointmentEdit} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;