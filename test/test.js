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
				modules.createUser('test@test.com', 'Test User').then((password) => {
					modules.verifyUser('test@test.com', password).then((verified) => {
						assert.equal(verified, true);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
			it('should create user test2@test.com and password is not verified', (done) => {
				modules.createUser('test2@test.com', 'Test User 2').then((password) => {
					modules.verifyUser('test@test.com', `${password}1`).then((verified) => {
						assert.equal(verified, false);
						return done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			});
		});
		describe('#createUser()', () => {
			it('should create user test3@test.com', (done) => {
				modules.createUser('test3@test.com', 'Test User 3').then((password) => {
					assert.notEqual(password, null);
					return done();
				}).catch(err => done(err));
			});
		});
	});
});
