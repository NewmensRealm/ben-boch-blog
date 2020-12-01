import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiEndpoint } from '../config.json';

http.setJwt(getJWT());

export async function login(email, password) {
	const { data: jwt } = await http.post(`${apiEndpoint}/auth`, {
		email,
		password,
	});
	localStorage.setItem('token', jwt);
}

export function logout() {
	localStorage.removeItem('token');
}

export function loginWithJWT(jwt) {
	localStorage.setItem('token', jwt);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem('token');
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}

export function getJWT() {
	return localStorage.getItem('token');
}
