const models = require('../models');

const props = ['AppointmentFullName', 'AppointmentDate', 'AppointmentCompleted', 'ReasonID', 'AppointmentCarMake', 'AppointmentCarModel', 'AppointmentCarYear', 'AppointmentNotes'];

const isMissingProps = (data) => {
	if (data) return props.filter(prop => !Object.prototype.hasOwnProperty.call(data, prop));
	return props;
};

module.exports = {
	/*
		createApointment: creates new appointments
		------------
		requirements:
		- AppointmentFullName
		- AppointmentDate
		- AppointmentCompleted
		- ReasonID
		- AppointmentCarMake
		- AppointmentCarModel
		- AppointmentCarYear
		- AppointmentNotes
		outputs:
		- appointment created
	*/
	createApointment: data => new Promise((resolve, reject) => {
		if (isMissingProps(data).length > 0) reject(new Error(`createApointment requires ${isMissingProps(data)}`));
		else {
			models.Appointment.create(data).then((createdAppointment) => {
				resolve(createdAppointment);
			});
		}
	}),
	/*
		editApointment: edits single appointment
		------------
		requirements:
		outputs:
	*/
	editApointment: data => new Promise((resolve, reject) => {
		if (data) resolve(data);
		else reject(new Error('editApointment requires data'));
	}),
	/*
		deleteApointment: deletes single appointment
		------------
		requirements:
		outputs:
	*/
	deleteApointment: data => new Promise((resolve, reject) => {
		if (data) resolve(data);
		else reject(new Error('deleteApointment requires data'));
	}),
	/*
		getAppointments: gets appointments based on fliter or no filter
		------------
		requirements:
		outputs:
	*/
	getAppointments: data => new Promise((resolve, reject) => {
		if (data) resolve(data);
		else reject(new Error('getAppointments requires data'));
	}),
	/*
		getAppointment: gets single appointment
		------------
		requirements:
		outputs:
	*/
	getAppointment: data => new Promise((resolve, reject) => {
		if (data) resolve(data);
		else reject(new Error('getAppointment requires data'));
	})
};
