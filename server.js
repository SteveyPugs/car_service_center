const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const models = require('./models');

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
