const models = require('../models');

module.exports = {
	/*
		getReasons: gets all reasons
		------------
		requirements: none
		outputs: array of reasons
	*/
	getReasons: () => new Promise((resolve, reject) => {
		models.Reason.findAll().then((reasons) => {
			resolve(reasons);
		}).catch((err) => {
			reject(err);
		});
	})
};
