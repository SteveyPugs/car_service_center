/* eslint-disable max-len */
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 5000;
const models = require('./models');
const modules = require('./modules');

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
	models.createDB();
});

/*
api to create new users
required:
- UserEmail
- UserFullName
returns:
- true
*/
app.post('/user', [
	check('UserEmail').isEmail(),
	check('UserFullName').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.User.createUser(req.body.UserEmail, req.body.UserFullName).then(() => res.status(200).send(true)).catch(err => res.status(500).send(err));
});

/*
api to updated users
required:
- UserID
- UserFullName
returns:
- update status
*/
app.put('/user/:UserID', [
	check('UserFullName').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.User.updateUser(req.params.UserID, req.body.UserFullName).then(updatedStatus => res.status(200).send(updatedStatus)).catch(err => res.status(500).send(err));
});

/*
api to verify user login
required:
- UserEmail
- UserPassword
returns:
- valid status
*/
app.post('/user/login', [
	check('UserEmail').isEmail(),
	check('UserPassword').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.User.verifyUser(req.body.UserEmail, req.body.UserPassword).then(valid => res.status(200).send(valid)).catch(err => res.status(500).send(err));
});

/*
api to get single appointment
required:
- AppointmentID
returns:
- Appointment Object
*/
app.get('/appointment/:AppointmentID', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Appointment.getAppointment(req.params.AppointmentID).then(appointment => res.status(200).send(appointment)).catch(err => res.status(500).send(err));
});

/*
api to create new appointments
required:
- AppointmentFullName
- AppointmentDate
- AppointmentCompleted
- ReasonID
- AppointmentCarMake
- AppointmentCarModel
- AppointmentCarYear
- AppointmentNotes
returns:
- new appointment
*/
app.post('/appointment', [
	check('AppointmentFullName').isLength({ min: 1 }),
	check('AppointmentDate').isLength({ min: 1 }),
	check('AppointmentCompleted').isLength({ min: 1 }),
	check('ReasonID').isLength({ min: 1 }),
	check('AppointmentCarMake').isLength({ min: 1 }),
	check('AppointmentCarModel').isLength({ min: 1 }),
	check('AppointmentCarYear').isLength({ min: 1 }),
	check('AppointmentNotes').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Appointment.createAppointment(req.body).then(() => res.status(200).send(true)).catch(err => res.status(500).send(err));
});

/*
api to update appointments
required:
- AppointmentID
returns:
- update status
*/
app.put('/appointment/:AppointmentID', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Appointment.editAppointment(req.params.AppointmentID, req.body).then(updatedStatus => res.status(200).send(updatedStatus)).catch(err => res.status(500).send(err));
});

/*
api to delete appointments
required:
- AppointmentID
returns:
- delete status
*/
app.delete('/appointment/:AppointmentID', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Appointment.deleteAppointment(req.params.AppointmentID).then(deleteStatus => res.status(200).send(deleteStatus)).catch(err => res.status(500).send(err));
});

/*
api to get appointments
required: none
returns: Appointments array
*/
app.get('/appointments', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Appointment.getAppointments({
		where: req.query
	}).then(appointments => res.status(200).send(appointments)).catch(err => res.status(500).send(err));
});

/*
api to get reasons
required: none
returns: Reasons array
*/
app.get('/reasons', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Reason.getReasons().then(reasons => res.status(200).send(reasons)).catch(err => res.status(500).send(err));
});

/*
api to create password reset hash
required:
- UserID
returns:
- true
*/
app.post('/password', [
	check('UserID').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Password.createPasswordReset(req.body.UserID).then(() => res.status(200).send(true)).catch(err => res.status(500).send(err));
});

/*
api to update password reset hash
required:
- PasswordResetHash
returns:
- true
*/
app.put('/password/:PasswordResetHash', (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.Password.updatePasswordReset(req.params.PasswordResetHash).then(() => res.status(200).send(true)).catch(err => res.status(500).send(err));
});
