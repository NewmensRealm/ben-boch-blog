import express from 'express';

const app = express();

const port = process.env.PORT | 5000;

require('./startup/db')();
require('./startup/routes')(app);

app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});
