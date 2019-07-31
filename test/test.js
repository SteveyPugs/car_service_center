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
				modules.createUser('test@test.com', 'Test User').then((userData) => {
					modules.verifyUser('test@test.com', userData[0]).then((verified) => {
						assert.equal(verified, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
			it('should create user test2@test.com and password is not verified', (done) => {
				modules.createUser('test2@test.com', 'Test User 2').then((userData) => {
					modules.verifyUser('test@test.com', `${userData[0]}1`).then((verified) => {
						assert.equal(verified, false);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
		describe('#createUser()', () => {
			it('should create user test3@test.com', (done) => {
				modules.createUser('test3@test.com', 'Test User 3').then((userData) => {
					assert.notEqual(userData[0], null);
					return done();
				}).catch(err => done(err));
			});
		});
		describe('#updateUser()', () => {
			it('should create user test4@test.com and update full name from Test User 4 to Test User 5', (done) => {
				modules.createUser('test4@test.com', 'Test User 4').then((userData) => {
					modules.updateUser(userData[1], 'Test User 5').then((updated) => {
						assert.equal(updated, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
	});
});
