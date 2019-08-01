// const models = require('../models');

module.exports = {
	/*
		createApointment: creates new appointments
		------------
		requirements:
		outputs:
	*/
	createApointment: data => new Promise((resolve, reject) => {
		if (data) resolve(data);
		else reject(new Error('createApointment requires data'));
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
