import React, { Component } from 'react';
import { map, find } from "lodash";

import Navbar from '../../NavBar/Navbar';
import carList from '../../car-list';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelList: [],
            reasons: []
        }
    }
    componentDidMount(){
        fetch('/reasons', {
            method: 'GET'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                reasons: response
            })
        })
    }
    makeChangeHandler = (event) => {
        let brand = find(carList, (car) => {
            return car.brand === event.target.value;
        })
        if(brand){
            this.setState({
                modelList: brand.models
            })
        } else {
            this.setState({
                modelList: []
            })
        }
    }
    render(){
        return(
            <div>
                <br/>
                <Navbar></Navbar>
                <br />
                <div className="container">
                    <h3>New</h3>
                    <hr />
                    <form onSubmit={this.props.handler}>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Full Name</label>
                                <input type="text" required className="form-control form-control-sm" name="AppointmentFullName" id="AppointmentFullName" />
                            </div>
                            <div className="form-group col-6">
                                <label>Date / Time</label>
                                <input type="date" required className="form-control form-control-sm" name="AppointmentDate" id="AppointmentDate" placeholder="Password" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Reason</label>
                                <select required name="ReasonID" id="ReasonID" className="form-control form-control-sm" defaultValue="">
                                    <option value="">Choose...</option>
                                    {this.state.reasons.map((value, index) => {
                                        return <option key={index} value={value.ReasonID}>{value.ReasonText + " ($" + value.ReasonPrice + ")"}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-6">
                                <label>Status</label>
                                <select required name="AppointmentCompleted" id="AppointmentCompleted" className="form-control form-control-sm" defaultValue="">
                                    <option value="">Choose...</option>
                                    <option value="0">Open</option>
                                    <option value="1">Closed</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label>Make</label>
                                <select required name="AppointmentCarMake" id="AppointmentCarMake" className="form-control form-control-sm" onChange={this.makeChangeHandler}>
                                    <option value="">Choose...</option>
                                    {map(carList, 'brand').sort().map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-4">
                                <label>Model</label>
                                <select required name="AppointmentCarModel" id="AppointmentCarModel" className="form-control form-control-sm">
                                    <option value="">Choose...</option>
                                    {this.state.modelList.map((value, index) => {
                                        return <option key={index} value={value}>{value}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-group col-4">
                                <label>Year</label>
                                <input type="number" required className="form-control form-control-sm" name="AppointmentCarYear" id="AppointmentCarYear" min="1900" max={(new Date().getFullYear())}/>
                                <div className="invalid-feedback">Enter a year</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col">
                                <label>Notes</label>
                                <textarea name="AppointmentNotes" id="AppointmentNotes" required className="form-control"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default New;
