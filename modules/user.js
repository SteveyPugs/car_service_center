const bcrypt = require('bcrypt');
const Chance = require('chance');
const models = require('../models');

const chance = new Chance();

module.exports = {
	/*
		createUser: creates a new user for the system with random password that is salted and hashed
		------------
		requirements:
		- email
		- fullName
		outputs:
		- random password
		- userid created
	*/
	createUser: (email, fullName) => new Promise((resolve, reject) => {
		if (email && fullName) {
			// generate random password
			const randomStr = chance.word({
				length: 8
			});
			// generate salt
			bcrypt.genSalt(10, (err, salt) => {
				if (err) reject(err);
				// generate hash on random password + salt
				bcrypt.hash(randomStr, salt, (err2, hash) => {
					// add user to the db
					if (err2) reject(err2);
					models.User.create({
						UserEmail: email,
						UserPassword: hash,
						UserFullName: fullName,
						UserSalt: salt
					}).then((createdUser) => {
						// return random password + user id created
						resolve([randomStr, createdUser.dataValues.UserID]);
					});
				});
			});
		} else reject(new Error('createUser requires email'));
	}),
	// Verify (GET) #10
	verifyUser: (email, password) => new Promise((resolve, reject) => {
		if (email && password) {
			models.User.findOne({
				where: {
					UserEmail: email
				},
				raw: true
			}).then((user) => {
				if (user) {
					bcrypt.compare(password, user.UserPassword, (err, res) => {
						if (err) reject(err);
						else resolve(res);
					});
				} else {
					resolve(false);
				}
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('verifyUser requires email and password'));
	}),
	// Update (PUT) #12
	updateUser: (id, fullName) => new Promise((resolve, reject) => {
		if (id && fullName) {
			models.User.update({
				UserFullName: fullName
			}, {
				where: {
					UserID: id
				}
			}).then(() => {
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('updateUser requires id and fullName'));
	})
};
