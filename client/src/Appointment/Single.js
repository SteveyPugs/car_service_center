import React from 'react';
import { Link } from "react-router-dom";

var Single = (props) => {
    return(
        <div className="alert alert-secondary" role="alert">
            <h4>Appointment Details</h4>
            <hr />
            <div className="row">
                <div className="col-6">
                    <h6>Full Name</h6>
                    Stephen Pugliese
                </div>
                <div className="col-6">
                    <h6>Date</h6>
                    July 27th, 2019 9:30 AM
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-6">
                    <h6>Reason</h6>
                    Oil Change
                </div>
                <div className="col-6">
                    <h6>Open / Closed</h6>
                    Closed
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-4">
                    <h6>Make</h6>
                    Chevy
                </div>
                <div className="col-4">
                    <h6>Model</h6>
                    Camaro
                </div>
                <div className="col-4">
                    <h6>Year</h6>
                    2010
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <h6>Notes</h6>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <Link to="/appointment/edit" className="btn btn-dark btn-sm">Edit</Link>
                </div>
                <div className="col text-right">
                    <button type="button" className="btn btn-dark btn-sm">Remove</button>
                </div>
            </div>
        </div>
    );
}

export default Single;