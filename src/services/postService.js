import http from './httpService';
import { apiEndpoint } from '../config.json';

export function getPosts() {
	return http.get(`${apiEndpoint}/posts`);
}

export function publishPost(post) {
	return http.post(`${apiEndpoint}/posts`, post);
}
