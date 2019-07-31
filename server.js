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

// create a GET route
app.get('/express_backend', (req, res) => {
	res.send({
		express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'
	});
});

// api to create new system users
app.post('/user', [
	check('UserEmail').isEmail(),
	check('UserFullName').isLength({ min: 1 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	return modules.createUser(req.body.UserEmail, req.body.UserFullName).then(() => res.status(200).send(true)).catch(err => res.status(500).send(err));
});
