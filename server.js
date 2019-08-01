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
