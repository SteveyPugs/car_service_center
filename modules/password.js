const crypto = require('crypto');
const models = require('../models');

module.exports = {
	/*
		createPasswordReset: creates new password reset
		------------
        requirements:
        - id
        outputs:
        - hash
	*/
	createPasswordReset: id => new Promise((resolve, reject) => {
		if (id) {
			const currentDate = (new Date()).valueOf().toString();
			const random = Math.random().toString();
			const hash = crypto.createHash('sha1').update(currentDate + random).digest('hex');
			models.PasswordReset.create({
				UserID: id,
				PasswordResetHash: hash
			}).then(() => {
				resolve(hash);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('createPasswordReset requires id'));
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
			models.PasswordReset.update({
				PasswordResetUsed: true
			}, {
				where: {
					PasswordResetHash: hash
				}
			}).then(() => {
				resolve(true);
			}).catch((err) => {
				reject(err);
			});
		} else reject(new Error('updatePasswordReset requires hash'));
	})
};
