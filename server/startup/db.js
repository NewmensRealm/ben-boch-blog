import mongoose from 'mongoose';
import config from 'config';

module.exports = function () {
	const db = config.get('db');
	mongoose
		.connect(db, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log('Connected to database...'))
		.catch((error) => console.log(`Could not connect to ${db}...`));
};
