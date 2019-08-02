import React from 'react';
import Navbar from '../NavBar/Navbar';
import SearchResuls from '../Appointment/SearchResult';
import Single from '../Appointment/Single';

var Search = (props) => {
    return(
        <div>
            <br/>
            <Navbar></Navbar>
            <br />
            <div className="row">
                <div className="col-6">
                    <SearchResuls></SearchResuls>
                </div>
                <div className="col-6">
                    <Single></Single>
                </div>
            </div>
        </div>
    );
}

export default Search;
