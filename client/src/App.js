import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import SignIn from './User/SignIn';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Router>
                    <Route path="/" exact component={SignIn} />
                </Router>                
            </div>
        );
    }
}

export default App;