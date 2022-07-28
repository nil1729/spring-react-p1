export async function sendGetRequest(api) {
	return fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/${api}`);
}

export async function sendPostRequest(api, requestBody) {
	return fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/${api}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});
}
