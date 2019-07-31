const assert = require('assert');
const models = require('../models');

describe('Car Service Testing Suite', () => {
	before(() => {
		models.createDB();
	});
	describe('Users', () => {
		describe('#indexOf()', () => {
			it('should return -1 when the value is not present', () => {
				assert.equal([1, 2, 3].indexOf(4), -1);
			});
		});
	});
});
