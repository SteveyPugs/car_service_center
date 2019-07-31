const bcrypt = require('bcrypt');
const Chance = require('chance');
const models = require('../models');

const chance = new Chance();

module.exports = {
	// Create (POST) #11
	createUser: (email, fullName) => new Promise((resolve, reject) => {
		if (email && fullName) {
			const randomStr = chance.word({
				length: 8
			});
			bcrypt.genSalt(10, (err, salt) => {
				if (err) reject(err);
				bcrypt.hash(randomStr, salt, (err2, hash) => {
					if (err2) reject(err2);
					models.User.create({
						UserEmail: email,
						UserPassword: hash,
						UserFullName: fullName,
						UserSalt: salt
					}).then((createdUser) => {
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
	// unit test needed
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
