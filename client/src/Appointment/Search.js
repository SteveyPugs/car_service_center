import React, { Component } from 'react';
import Navbar from '../NavBar/Navbar';
import SearchResuls from '../Appointment/SearchResult';
import Single from '../Appointment/Single';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: null
        }
    }
    singleView = () => {
        if(this.props.handlerView){
            return <Single handlerView={this.props.handlerView}></Single>
        } else {
            return <p>Select an appointment</p>
        }
    }
    render() {
        return(
            <div>
                <br/>
                <Navbar></Navbar>
                <br />
                <div className="row">
                    <div className="col-6">
                        <SearchResuls handleSingleChoice={this.props.handler}></SearchResuls>
                    </div>
                    <div className="col-6">
                        {this.singleView()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
