import React, { Component } from 'react';
import moment from 'moment'
import { orderBy } from "lodash";


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            priceOrder: 'desc',
            AppointmentDateTimeFrom: null,
            AppointmentDateTimeTo: null
        }
    }
    getAppointments = () => {
        if(this.state.AppointmentDateTimeFrom && this.state.AppointmentDateTimeTo){
            //do both
        } else if (this.state.AppointmentDateTimeFrom) {
            //do left
        } else if (this.state.AppointmentDateTimeTo) {
            //do right
        }
        fetch('/appointments', {
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
            AppointmentDateTimeFrom: event.target.value
        })
        this.getAppointments();
    }
    handleDateToFilter = (event) => {
        this.setState({
            AppointmentDateTimeTo: event.target.value
        })
        this.getAppointments();
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
                                <input type="date" className="form-control form-control-sm" name="AppointmentDateTimeFrom" id="AppointmentDateTimeFrom" onChange={this.handleDateFromFilter}/>
                            </div>
                            <div className="form-group col-md-6">
                            <label>Appointment Date <small>To</small></label>
                                <input type="date" className="form-control form-control-sm" name="AppointmentDateTimeTo" id="AppointmentDateTimeTo" onChange={this.handleDateToFilter}/>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <button type="button" className="btn btn-light btn-sm" onClick={this.handlePriceOrder}>Price Sorted {this.state.priceOrder === 'desc' ? 'High > Low' : 'Low > High'}</button>
                <br /><br />
                <div className="list-group">
                    {orderBy(this.state.appointments, ['ReasonPrice'], [this.state.priceOrder]).map((value, index) => {               
                        return (
                            <a key={value.AppointmentID} href="#" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{value.AppointmentFullName}</h5>
                                    <small>
                                    {moment(value.AppointmentDate).format('YYYY-MM-DD')}</small>
                                </div>                            
                                <small>{value.ReasonText} (${value.ReasonPrice})</small>
                            </a>
                        )
                    })}
                </div>
            </div>
        )
    }    
}

export default SearchResult;