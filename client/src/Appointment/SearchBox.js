import React from 'react';

var SearchBox = (props) => {
    return(
        <div className="card">
            <div className="card-header">Filter</div>
            <div className="card-body">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Make</label>
                            <select id="Make" className="form-control form-control-sm" defaultValue="">
                                <option></option>
                                <option>Chevy</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Model</label>
                            <select id="Model" className="form-control form-control-sm" defaultValue="">
                                <option></option>
                                <option>Camaro</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Year</label>
                            <input type="date" className="form-control form-control-sm" id="Year" min="1900" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Appointment Date</label>
                            <input type="date" className="form-control form-control-sm" id="AppointmentDateTime"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Completed</label>
                            <select id="Completed" className="form-control form-control-sm" defaultValue="">
                                <option></option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" className="form-control form-control-sm" id="Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Reason</label>
                            <select id="Reason" className="form-control form-control-sm" defaultValue="">
                                <option></option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm">Search</button>
                </form>
            </div>
        </div>
    );
}

export default SearchBox;