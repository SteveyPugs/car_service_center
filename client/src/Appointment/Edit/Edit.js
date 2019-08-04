import React, { Component } from 'react';
import Navbar from '../../NavBar/Navbar';
import moment from 'moment';
import { map, find } from "lodash";
import carList from '../../car-list';
import $ from 'jquery';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: null,
            modelList: [],
            reasons: []
        }
    }
    componentDidMount(){
        fetch('/appointment/' + this.props.match.params.id, {
            method: 'GET'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                appointment: response
            }, function(){
                this.makeChangeHandler()
            })
        })
        fetch('/reasons', {
            method: 'GET'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                reasons: response
            })
        })
    }
    makeChangeHandler = (event) => {
        let models = find(carList, (car) => {
            return car.brand === (event ? event.target.value : this.state.appointment.AppointmentCarMake);
        }).models
        this.setState({
            modelList: models
        })
    }
    renderForm = () => {
        if(this.state.appointment){            
            return(
                <div>
                    <br/>
                    <Navbar></Navbar>
                    <br />
                    <div className="container">
                        <h3>Edit</h3>
                        <hr />
                        <form onSubmit={this.props.handler}>
                            <input type='hidden' name="AppointmentID" id="AppointmentID" defaultValue={this.state.appointment.AppointmentID} />
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control form-control-sm" id="AppointmentFullName" defaultValue={this.state.appointment.AppointmentFullName} />
                                </div>
                                <div className="form-group col-6">
                                    <label>Date / Time</label>
                                    <input type="date" className="form-control form-control-sm" id="AppointmentDate" placeholder="Password" defaultValue={moment(this.state.appointment.AppointmentDate).format('YYYY-MM-DD')} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-6">
                                    <label>Reason</label>
                                    <select required name="ReasonID" id="ReasonID" className="form-control form-control-sm">
                                        <option value="">Choose...</option>
                                        {this.state.reasons.map((value, index) => {
                                            return <option selected={this.state.appointment.ReasonID === value.ReasonID} key={index} value={value.ReasonID}>{value.ReasonText + " ($" + value.ReasonPrice + ")"}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label>Status</label>
                                    <select required name="AppointmentCompleted" id="AppointmentCompleted" className="form-control form-control-sm">
                                        <option value="">Choose...</option>
                                        <option selected={this.state.appointment.AppointmentCompleted === false} value="0">Open</option>
                                        <option selected={this.state.appointment.AppointmentCompleted === true} value="1">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label>Make</label>
                                    <select required name="AppointmentCarMake" id="AppointmentCarMake" className="form-control form-control-sm" onChange={this.makeChangeHandler}>
                                        <option value="">Choose...</option>
                                        {map(carList, 'brand').sort().map((value, index) => {
                                            return <option selected={this.state.appointment.AppointmentCarMake === value} key={index} value={value}>{value}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>Model</label>
                                    <select required name="AppointmentCarModel" id="AppointmentCarModel" className="form-control form-control-sm">
                                        <option value="">Choose...</option>
                                        {this.state.modelList.map((value, index) => {
                                            return <option selected={this.state.appointment.AppointmentCarModel === value} key={index} value={value}>{value}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-4">
                                    <label>Year</label>
                                    <input type="number" defaultValue={this.state.appointment.AppointmentCarYear} required className="form-control form-control-sm" name="AppointmentCarYear" id="AppointmentCarYear" min="1900" max={(new Date().getFullYear())} />
                                    <div className="invalid-feedback">Enter a year</div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <label>Notes <small>(optional)</small></label>
                                    <textarea name="AppointmentNotes" id="AppointmentNotes" className="form-control">{this.state.appointment.AppointmentNotes}</textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

export default Edit;
