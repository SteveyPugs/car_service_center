import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment'

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: null
        }
    }
    componentDidMount(){
        fetch('/appointment/' + this.props.handlerView, {
            method: 'GET'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                appointment: response
            })
        })
    }
    componentDidUpdate(){
        if(this.state.appointment && (this.state.appointment.AppointmentID !== this.props.handlerView)){
            fetch('/appointment/' + this.props.handlerView, {
                method: 'GET'
            }).then((resp) => resp.json()).then(response => {
                this.setState({
                    appointment: response
                })
            })
        }
    }
    deleteAppointment = () => {
        fetch('/appointment/' + this.state.appointment.AppointmentID, {
            method: 'DELETE'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                appointment: response
            }, function(){
                window.location = '/appointments'
            })
        })
    }
    show = () => {
        if(this.state.appointment){
            return (
                <div>
                    <h4>Appointment Details</h4>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <h6>Full Name</h6>
                            {this.state.appointment.AppointmentFullName}
                        </div>
                        <div className="col-6">
                            <h6>Date</h6>
                            {moment(this.state.appointment.AppointmentDate).format('YYYY-MM-DD')}                            
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <h6>Reason</h6>
                            {this.state.appointment.ReasonText}
                        </div>
                        <div className="col-6">
                            <h6>Open / Closed</h6>
                            {this.state.appointment.AppointmentCompleted ? 'Closed' : 'Open'}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-4">
                            <h6>Make</h6>
                            {this.state.appointment.AppointmentCarMake}
                        </div>
                        <div className="col-4">
                            <h6>Model</h6>
                            {this.state.appointment.AppointmentCarModel}
                        </div>
                        <div className="col-4">
                            <h6>Year</h6>
                            {this.state.appointment.AppointmentCarYear}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <h6>Notes</h6>
                            {this.state.appointment.AppointmentNotes}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <Link to={`/appointment/edit/${this.state.appointment.AppointmentID}`} className="btn btn-dark btn-sm">Edit</Link>
                        </div>
                        <div className="col text-right">
                            <button type="button" className="btn btn-dark btn-sm" data-toggle="modal" data-target="#deleteAppointmentModal">Remove</button>
                        </div>
                    </div>
                    <div className="modal fade" id="deleteAppointmentModal" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteAppointmentModalLabel">Are you you want to delete this appointment?</h5>
                                </div>
                                <div className="modal-footer">
                                    <div className="col-6">
                                        <button type="button" className="btn btn-block btn-success" onClick={this.deleteAppointment}>Yes</button>
                                    </div>
                                    <div className="col-6">
                                        <button type="button" className="btn btn-block btn-danger" data-dismiss="modal">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="alert alert-secondary" role="alert">
                {this.show()}
            </div>
        )
    }
}

export default Single;