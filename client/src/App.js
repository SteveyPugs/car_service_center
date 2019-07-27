import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import SignIn from './User/SignIn';
import Forgot from './User/Forgot';
import NoMatch from './NoMatch/NoMatch';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={SignIn} />
                        <Route path="/forgot" exact component={Forgot} />
                        <Route component={NoMatch} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;