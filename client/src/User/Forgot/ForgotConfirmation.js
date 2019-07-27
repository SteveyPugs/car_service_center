import React from 'react';
import { Link } from "react-router-dom";

var ForgotConfirmation = (props) => {
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

export default ForgotConfirmation;