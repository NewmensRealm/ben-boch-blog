import http from './httpService';
import { apiEndpoint } from '../config.json';

export function register(user) {
	return http.post(`${apiEndpoint}/users`, {
		username: user.username,
		email: user.email,
		password: user.password,
	});
}

export function getUser(userId) {
	return http.get(`${apiEndpoint}/users/${userId}`);
}
