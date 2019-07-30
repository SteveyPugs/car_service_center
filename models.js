const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Chance = require('chance');
const db = require('./server-config');

const chance = new Chance();

const sequelize = new Sequelize(db.dbName, db.dbUsername, db.dbPassword, {
	host: db.dbHost,
	dialect: 'mysql'
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((err) => {
	console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('User', {
	UserID: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	UserEmail: {
		type: Sequelize.STRING,
		allowNull: false
	},
	UserPassword: {
		type: Sequelize.STRING,
		allowNull: false
	},
	UserFullName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	UserCreateDate: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	UserSalt: {
		type: Sequelize.STRING,
		allowNull: false
	},
	UserDeleted: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	timestamps: false,
	paranoid: false
});

const PasswordReset = sequelize.define('PasswordReset', {
	PasswordResetID: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	PasswordResetHash: {
		type: Sequelize.STRING,
		allowNull: false
	},
	PasswordResetCreateDate: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	PasswordResetDeleted: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	PasswordResetUsed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	timestamps: false,
	paranoid: false
});

const Appointment = sequelize.define('Appointment', {
	AppointmentID: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	AppointmentFullName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	AppointmentDate: {
		type: Sequelize.DATE,
		allowNull: false
	},
	AppointmentDeleted: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	AppointmentCompleted: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	AppointmentCreateDate: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW
	},
	AppointmentReason: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	AppointmentCarMake: {
		type: Sequelize.STRING,
		allowNull: false
	},
	AppointmentCarModel: {
		type: Sequelize.STRING,
		allowNull: false
	},
	AppointmentCarYear: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	AppointmentNotes: {
		type: Sequelize.TEXT,
		allowNull: false
	}
}, {
	timestamps: false,
	paranoid: false
});

User.hasMany(PasswordReset, {
	foreignKey: 'UserID'
});

module.exports = {
	User,
	PasswordReset,
	Appointment,
	createDB() {
		sequelize.sync({
			force: false
		}).then(() => {
			User.findOne({
				where: {
					UserEmail: 'stephen.pugliese@outlook.com',
					UserDeleted: false
				}
			}).then((user) => {
				if (!user) {
					const randomStr = chance.word({
						length: 8
					});
					bcrypt.genSalt(10, (err, salt) => {
						if (err) console.error(err);
						else console.log(`Password for stephen.pugliese@outlook.com is :${randomStr}`);
						bcrypt.hash(randomStr, salt, (_err, hash) => {
							User.create({
								UserEmail: 'stephen.pugliese@outlook.com',
								UserPassword: hash,
								UserFullName: 'Stephen Pugliese',
								UserSalt: salt
							});
							console.log('tables synced + first user created');
						});
					});
				} else {
					console.log('tables synced');
				}
			});
		});
	}
};
