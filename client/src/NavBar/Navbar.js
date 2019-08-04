import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const handleLogout = () => {
    cookies.remove('fe_cookie');
    window.location = '/'  
}

const Navbar = (props) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/appts">Appointment Book</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#appointmentNavbar" aria-controls="appointmentNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse align-items-center" id="appointmentNavbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/appointment/new" className="nav-link">Add New</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto align-items-center">
                    <li className="nav-item" onClick={handleLogout}>Sign Out</li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
