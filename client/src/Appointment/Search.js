import React from 'react';
import Navbar from '../NavBar/Navbar';
import SearchBox from '../Appointment/SearchBox';
import SearchResuls from '../Appointment/SearchResult';

var Search = (props) => {
    return(
        <div>
            <br/>
            <Navbar></Navbar>
            <br />
            <div className="row">
                <div className="col-6">
                    <SearchBox></SearchBox>
                    <br />
                    <SearchResuls></SearchResuls>
                </div>
                <div className="col-6">Selected item will go here</div>
            </div>
        </div>
    );
}

export default Search;
