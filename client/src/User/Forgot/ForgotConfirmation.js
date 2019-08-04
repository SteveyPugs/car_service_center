import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ForgotConfirmation extends Component {
    constructor(props) {
        super(props);
        console.log()
    }
    componentDidMount(){
        fetch('/password/' + this.props.match.params.hash, {
            method: 'PUT',
        }).then((resp) => resp.json()).then(response => {
            console.log(response)
        })
    }
    render(){
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-6 offset-3">
                        <div className="alert alert-success text-center" role="alert">
                            Your password has been successfully reset
                            <br />
                            <br />
                            <Link to="/" className="btn btn-link">
                                Return to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default ForgotConfirmation;