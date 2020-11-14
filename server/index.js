import express from 'express';
import cors from 'cors';

const app = express();

const port = process.env.PORT | 5000;

app.use(cors());
require('./startup/db')();
require('./startup/routes')(app);

app.listen(port, () => {
	console.log(`Server running on port ${port}...`);
});
