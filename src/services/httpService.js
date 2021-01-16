import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.log(error);
	}

	return Promise.reject(error);
});

export function setJwt(jwt) {
	axios.defaults.headers.common['x-auth-token'] = jwt;
}

export function getFile(url) {
	return axios(url, {
		method: 'GET',
		responseType: 'blob', //Force to receive data in a Blob Format
	});
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
