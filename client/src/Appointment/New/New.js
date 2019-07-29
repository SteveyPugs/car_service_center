import React from 'react';
import Navbar from '../../NavBar/Navbar';

var New = (props) => {
    return(
        <div>
            <br/>
            <Navbar></Navbar>
            <br />
            <div className="container">
                <h3>New</h3>
                <hr />
                <form>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label>Full Name</label>
                            <input type="text" className="form-control form-control-sm" id="Name" />
                        </div>
                        <div className="form-group col-6">
                            <label>Date / Time</label>
                            <input type="date" className="form-control form-control-sm" id="DateTime" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label>Reason</label>
                            <select id="Reason" className="form-control form-control-sm" defaultValue="">
                                <option>Choose...</option>
                            </select>
                        </div>
                        <div className="form-group col-6">
                            <label>Status</label>
                            <select id="Completed" className="form-control form-control-sm" defaultValue="">
                                <option>Choose...</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-4">
                            <label>Make</label>
                            <select id="Make" className="form-control form-control-sm" defaultValue="">
                                <option>Choose...</option>
                            </select>
                        </div>
                        <div className="form-group col-4">
                            <label>Model</label>
                            <select id="Model" className="form-control form-control-sm" defaultValue="">
                                <option>Choose...</option>
                            </select>
                        </div>
                        <div className="form-group col-4">
                            <label>Year</label>
                            <input type="date" className="form-control form-control-sm" id="Year" min="1900" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Notes</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
}

export default New;
