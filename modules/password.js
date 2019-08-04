const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Chance = require('chance');

const models = require('../models');

const chance = new Chance();

module.exports = {
	/*
		createPasswordReset: creates new password reset
		------------
        requirements:
        - id
        outputs:
        - hash
	*/
	createPasswordReset: email => new Promise((resolve, reject) => {
		if (email) {
			models.User.findOne({
				where: {
					UserEmail: email,
					UserDeleted: false
				},
				raw: true
			}).then((user) => {
				if (user) {
					const currentDate = (new Date()).valueOf().toString();
					const random = Math.random().toString();
					const hash = crypto.createHash('sha1').update(currentDate + random).digest('hex');
					models.PasswordReset.create({
						UserID: user.UserID,
						PasswordResetHash: hash
					}).then(() => {
						resolve(hash);
					}).catch((err) => {
						reject(err);
					});
				} else {
					resolve();
				}
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('createPasswordReset requires email'));
	}),
	/*
		updatePasswordReset: update password reset
		------------
		requirements:
		- hash
		outputs:
		- true
	*/
	updatePasswordReset: hash => new Promise((resolve, reject) => {
		if (hash) {
			models.PasswordReset.findOne({
				where: {
					PasswordResetHash: hash,
					PasswordResetUsed: false
				}
			}).then((passwordreset) => {
				if (passwordreset) {
					models.PasswordReset.update({
						PasswordResetUsed: true
					}, {
						where: {
							PasswordResetHash: hash
						}
					}).then(() => {
						// generate random password
						const randomStr = chance.word({
							length: 8
						});
						console.log(`Password has been reset using :${randomStr}`);
						// generate salt
						bcrypt.genSalt(10, (err, salt) => {
							if (err) reject(err);
							// generate hash on random password + salt
							bcrypt.hash(randomStr, salt, (err2, newHash) => {
								// add user to the db
								if (err2) reject(err2);
								models.User.update({
									UserPassword: newHash,
									UserSalt: salt
								}, {
									where: {
										UserID: passwordreset.UserID
									}
								}).then(() => {
									resolve(true);
								});
							});
						});
					}).catch((err) => {
						reject(err);
					});
				} else {
					resolve(true);
				}
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('updatePasswordReset requires hash'));
	})
};
