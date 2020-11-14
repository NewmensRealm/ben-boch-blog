import express from 'express';
import posts from '../routes/posts';
import users from '../routes/users';

module.exports = function (app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static('public'));

	app.use('/api/posts', posts);
	app.use('/api/users', users);
};
