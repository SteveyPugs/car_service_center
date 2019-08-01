const models = require('../models');

const props = ['AppointmentFullName', 'AppointmentDate', 'AppointmentCompleted', 'ReasonID', 'AppointmentCarMake', 'AppointmentCarModel', 'AppointmentCarYear', 'AppointmentNotes'];

const isMissingProps = (data) => {
	if (data) return props.filter(prop => !Object.prototype.hasOwnProperty.call(data, prop));
	return props;
};

module.exports = {
	/*
		createAppointment: creates new appointments
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
	createAppointment: data => new Promise((resolve, reject) => {
		// if missing any props do not create and return error
		if (isMissingProps(data).length > 0) reject(new Error(`createAppointment requires ${isMissingProps(data)}`));
		else {
			// create new appointment
			models.Appointment.create(data).then((createdAppointment) => {
				resolve(createdAppointment);
			});
		}
	}),
	/*
		editAppointment: edits single appointment
		------------
		requirements:
		- id
		- data (appointment fields)
		outputs:
		- true
	*/
	editAppointment: (id, data) => new Promise((resolve, reject) => {
		if (id && data) {
			// if id and data then update appointment based on id
			models.Appointment.update(data, {
				where: {
					AppointmentID: id
				}
			}).then(() => {
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('editAppointment requires id and data'));
	}),
	/*
		deleteAppointment: deletes single appointment
		------------
		requirements:
		- id
		outputs:
		- true
	*/
	deleteAppointment: id => new Promise((resolve, reject) => {
		if (id) {
			// if id then delete appointment based on id
			models.Appointment.update({
				AppointmentDeleted: true
			}, {
				where: {
					AppointmentID: id
				}
			}).then(() => {
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('deleteAppointment requires id'));
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
		- id
		outputs:
		- data object
	*/
	getAppointment: id => new Promise((resolve, reject) => {
		if (id) {
			// if id then get appointment based on id
			models.Appointment.findOne({
				where: {
					AppointmentID: id
				}
			}).then((appointment) => {
				resolve(appointment);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('getAppointment requires id'));
	})
};
