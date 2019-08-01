/* eslint-disable max-len */
const assert = require('assert');
const models = require('../models');
const modules = require('../modules');

describe('Car Service Testing Suite', () => {
	before(() => {
		models.createDB();
	});
	describe('Users', () => {
		describe('#verifyUser()', () => {
			it('should create user test@test.com and password is verified', (done) => {
				modules.User.createUser('test@test.com', 'Test User').then((userData) => {
					modules.User.verifyUser('test@test.com', userData[0]).then((verified) => {
						assert.equal(verified, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
			it('should create user test2@test.com and password is not verified', (done) => {
				modules.User.createUser('test2@test.com', 'Test User 2').then((userData) => {
					modules.User.verifyUser('test@test.com', `${userData[0]}1`).then((verified) => {
						assert.equal(verified, false);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
		describe('#createUser()', () => {
			it('should create user test3@test.com', (done) => {
				modules.User.createUser('test3@test.com', 'Test User 3').then((userData) => {
					assert.notEqual(userData[0], null);
					return done();
				}).catch(err => done(err));
			});
		});
		describe('#updateUser()', () => {
			it('should create user test4@test.com and update full name from Test User 4 to Test User 5', (done) => {
				modules.User.createUser('test4@test.com', 'Test User 4').then((userData) => {
					modules.User.updateUser(userData[1], 'Test User 5').then((updated) => {
						assert.equal(updated, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
			it('should not user test5@test.com as the id does not exist', (done) => {
				modules.User.updateUser(5000, 'Test User 5').then((updated) => {
					assert.equal(updated, false);
					return done();
				}).catch(err => done(err));
			});
		});
	});
	describe('Appointments', () => {
		describe('#createAppointment()', () => {
			it('should create a new appointment', (done) => {
				modules.Appointment.createAppointment({
					AppointmentFullName: 'Stephen Pugliese',
					AppointmentDate: new Date(),
					AppointmentCompleted: false,
					ReasonID: 1,
					AppointmentCarMake: 'Chevrolet',
					AppointmentCarModel: 'Traverse',
					AppointmentCarYear: 2018,
					AppointmentNotes: 'Car is a lease'
				}).then((createdApointment) => {
					assert.notEqual(createdApointment, null);
					return done();
				}).catch(err => done(err));
			});
		});
		describe('#editAppointment()', () => {
			it('should create a new appointment and update some details', (done) => {
				modules.Appointment.createAppointment({
					AppointmentFullName: 'Stephen Pugliese',
					AppointmentDate: new Date(),
					AppointmentCompleted: false,
					ReasonID: 1,
					AppointmentCarMake: 'Chevrolet',
					AppointmentCarModel: 'Traverse',
					AppointmentCarYear: 2018,
					AppointmentNotes: 'Car is a lease'
				}).then((createdApointment) => {
					modules.Appointment.editAppointment(createdApointment.dataValues.AppointmentID, {
						AppointmentCompleted: true
					}).then((editStatus) => {
						assert.equal(editStatus, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
		describe('#deleteAppointment()', () => {
			it('should create a new appointment and delete it', (done) => {
				modules.Appointment.createAppointment({
					AppointmentFullName: 'Stephen Pugliese',
					AppointmentDate: new Date(),
					AppointmentCompleted: false,
					ReasonID: 1,
					AppointmentCarMake: 'Chevrolet',
					AppointmentCarModel: 'Traverse',
					AppointmentCarYear: 2018,
					AppointmentNotes: 'Car is a lease'
				}).then((createdApointment) => {
					modules.Appointment.deleteAppointment(createdApointment.dataValues.AppointmentID).then((deleteStatus) => {
						assert.equal(deleteStatus, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
		describe('#getAppointments()', () => {
			it('should get all appointments', (done) => {
				modules.Appointment.getAppointments().then((appointments) => {
					assert.equal(appointments.length > 0, true);
					return done();
				}).catch(err => done(err));
			});
			it('should get all appointments that are completed', (done) => {
				modules.Appointment.getAppointments({
					where: {
						AppointmentCompleted: true
					}
				}).then((appointments) => {
					assert.equal(appointments.length > 0, true);
					return done();
				}).catch(err => done(err));
			});
		});
		describe('#getAppointment()', () => {
			it('should create a new appointment and get it', (done) => {
				modules.Appointment.createAppointment({
					AppointmentFullName: 'Stephen Pugliese',
					AppointmentDate: new Date(),
					AppointmentCompleted: false,
					ReasonID: 1,
					AppointmentCarMake: 'Chevrolet',
					AppointmentCarModel: 'Traverse',
					AppointmentCarYear: 2018,
					AppointmentNotes: 'Car is a lease'
				}).then((createdApointment) => {
					modules.Appointment.getAppointment(createdApointment.dataValues.AppointmentID).then((appointment) => {
						assert.notEqual(appointment, null);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
	});
});
