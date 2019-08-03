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
    constructor(props, context) {
        super(props, context);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleNewAppointment = this.handleNewAppointment.bind(this);
        this.state = {
            chosenRecord: null
        }
    }
    handleLogin = (event) => {
        event.preventDefault();
        let randomSeq =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        if(event.target.checkValidity()){
            fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserEmail: event.target.UserEmail.value,
                    UserPassword: event.target.UserPassword.value
                })
            }).then((resp) => resp.json()).then(response => {
                if(response){
                    cookies.set('fe_cookie', randomSeq, {
                        path: '/'
                    });
                    window.location = '/appointments'  
                }
            })
        }
    }
    handleNewAppointment = (event) => {
        event.preventDefault();
        if(event.target.checkValidity()){
            fetch('/appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    AppointmentFullName: event.target.AppointmentFullName.value,
                    AppointmentDate: event.target.AppointmentDate.value,
                    AppointmentCompleted: event.target.AppointmentCompleted.value,
                    AppointmentCarMake: event.target.AppointmentCarMake.value,
                    AppointmentCarModel: event.target.AppointmentCarModel.value,
                    AppointmentCarYear: event.target.AppointmentCarYear.value,
                    AppointmentNotes: event.target.AppointmentNotes.value,
                    ReasonID: event.target.ReasonID.value,
                })
            }).then((resp) => resp.json()).then(response => {
                if(response){
                    window.location = '/appointments'  
                }
            })
        }
    }
    handleSingleChoice = (id) => {
        console.log(id)
        this.setState({
            chosenRecord: id
        })
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact render={(props) => <SignIn {...props} handleLogin={this.handleLogin} />} />
                        <Route path="/forgot" exact component={Forgot} />
                        <Route path="/forgot-step-2" exact component={ForgotConfirmation} />
                        <PrivateRoute path="/appointments" exact component={AppointmentSearch} handler={this.handleSingleChoice} handlerView={this.state.chosenRecord} />
                        <PrivateRoute path="/appointment/new" exact component={AppointmentNew} handler={this.handleNewAppointment} />
                        <PrivateRoute path="/appointment/edit" exact component={AppointmentEdit} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function PrivateRoute ({component: Component, handler, handlerView, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => cookies.get('fe_cookie') ? <Component {...props} handler={handler} handlerView={handlerView}
            /> : <Redirect to={{
                pathname: '/',
                state: {
                    from: props.location
                }
            }} />}
        />
    )
}

export default App;