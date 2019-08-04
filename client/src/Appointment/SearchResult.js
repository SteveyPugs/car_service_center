import React, { Component } from 'react';
import moment from 'moment'
import { orderBy } from "lodash";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            priceOrder: 'desc',
            AppointmentDateFrom: '',
            AppointmentDateTo: ''
        }
    }
    getAppointments = () => {
        fetch('/appointments?AppointmentDateFrom=' + this.state.AppointmentDateFrom + '&AppointmentDateTo=' + this.state.AppointmentDateTo + '', {
            method: 'GET'
        }).then((resp) => resp.json()).then(response => {
            this.setState({
                appointments: response
            })
        })
    }
    componentDidMount(){
        this.getAppointments();
    }
    handlePriceOrder = () => {
        if(this.state.priceOrder === 'desc' ){
            this.setState({
                priceOrder: 'asc'
            })
        } else {
            this.setState({
                priceOrder: 'desc'
            })
        }
    }
    handleDateFromFilter = (event) => {
        this.setState({
            AppointmentDateFrom: event.target.value
        }, function() { 
            this.getAppointments();
        });
    }
    handleDateToFilter = (event) => {
        this.setState({
            AppointmentDateTo: event.target.value
        }, function() { 
            this.getAppointments();
        });
    }
    generateList = () => {
        if(this.state.appointments.length > 0){
            return orderBy(this.state.appointments, ['ReasonPrice'], [this.state.priceOrder]).map((value, index) => {   
                let key = value.AppointmentID;
                return (
                    <button key={key} onClick={() => this.props.handleSingleChoice(key)} className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{value.AppointmentFullName}</h5>
                            <small>{moment(value.AppointmentDate).format('YYYY-MM-DD')}</small>
                        </div>                            
                        <small>{value.ReasonText} (${value.ReasonPrice})</small>
                    </button>
                )
            })
        } else {
            return <p className="text-secondary text-center">No Appointments</p>
        }
    }
    render(){
        return(
            <div>
                <div className="card">
                    <div className="card-header">Filter</div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Appointment Date <small>From</small></label>
                                <input type="date" className="form-control form-control-sm" name="AppointmentDateFrom" id="AppointmentDateFrom" onChange={this.handleDateFromFilter}/>
                            </div>
                            <div className="form-group col-md-6">
                            <label>Appointment Date <small>To</small></label>
                                <input type="date" className="form-control form-control-sm" name="AppointmentDateTo" id="AppointmentDateTo" onChange={this.handleDateToFilter}/>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <button type="button" className="btn btn-light btn-sm" onClick={this.handlePriceOrder}>Price Sorted {this.state.priceOrder === 'desc' ? 'High > Low' : 'Low > High'}</button>
                <br /><br />
                <div className="list-group">
                    {this.generateList()}
                </div>
            </div>
        )
    }    
}

export default SearchResult;