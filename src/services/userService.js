import http from './httpService';
import { apiEndpoint } from '../config.json';

export function register(user) {
	return http.post(`${apiEndpoint}/users`, {
		name: user.name,
		email: user.email,
		password: user.password,
	});
}
