import React from 'react';

var SearchResult = (props) => {
    return(
        <div className="list-group">
            <a href="/" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Stephen Pugliese</h5>
                    <small>July 27th, 2019 9:30 AM</small>
                </div>
                <p className="mb-1">Description</p>
                <small>Oil Change</small>
            </a>
            <a href="/" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Melissa Ruvio</h5>
                    <small>July 27th, 2019 9:20 AM</small>
                </div>
                <p className="mb-1">Description</p>
                <small>Inspection</small>
            </a>
        </div>
    );
}

export default SearchResult;