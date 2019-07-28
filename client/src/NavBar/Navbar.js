import React from 'react';
import { Link } from "react-router-dom";

var Navbar = (props) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            Appointment Book
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#appointmentNavbar" aria-controls="appointmentNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse align-items-center" id="appointmentNavbar">
                <ul className="navbar-nav ml-auto align-items-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Sign Out</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
