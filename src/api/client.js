const SERVER_URL =
	process.env.NODE_ENV == "production"
		? "https://stark-everglades-14139.herokuapp.com"
		: "http://localhost:5001";

const defaultHeaders = {
	headers: {
		"Content-Type": "application/json",
	},
	credentials: "include",
};

export const uploadImageToCloudinaryAPI = formData => {
	const cloudName = "ddrzspgjy";
	return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
		method: "POST",
		body: formData,
	})
		.then(checkStatus)
		.then(parseJSON);
};

// User auth APIs

export const getUserAPI = () => {
	return fetch(`${SERVER_URL}/api/user`, {
		...defaultHeaders,
	}).then(response => {
		if (response.status >= 400) {
			return null;
		} else {
			return parseJSON(response);
		}
	});
};

export const getUsersAPI = () => {
	return fetch(`${SERVER_URL}/api/users`, {
		...defaultHeaders,
	}).then(response => {
		if (response.status >= 400) {
			return null;
		} else {
			return parseJSON(response);
		}
	});
};

export const updateUserAPI = user => {
	return fetch(`${SERVER_URL}/api/user`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify({
			userName: user?.userName,
			address1: user?.address1,
			address2: user?.address2,
			image: user?.image,
			email: user?.email,
		}),
	}).then(checkStatus);
};

export const deleteUserByIdAPI = userId => {
	return fetch(`${SERVER_URL}/api/user/${userId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON);
};

export const registerAPI = (userName, email, password) => {
	return fetch(`${SERVER_URL}/api/register`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify({
			userName: userName,
			email: email,
			password: password,
		}),
	}).then(response => {
		if (response.status >= 400) {
			return "duplicated";
		}
		return "success";
	});
};

export const loginAPI = (email, password) => {
	return fetch(`${SERVER_URL}/api/login`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	}).then(response => {
		if (response.status < 400) {
			return "success";
		} else {
			return "failed";
		}
	});
};

export const logoutAPI = () => {
	return fetch(`${SERVER_URL}/api/logout`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify([]),
	}).then(checkStatus);
};

// questions APIs
export const getQuestionsAPI = () => {
	return fetch(`${SERVER_URL}/api/questions`, {
		...defaultHeaders,
	})
		.then(checkStatus)
		.then(parseJSON);
};

export const createQuestionAPI = question => {
	return fetch(`${SERVER_URL}/api/questions`, {
		...defaultHeaders,
		method: "POST",
		body: JSON.stringify(question),
	}).then(checkStatus);
};

export const updateQuestionAPI = question => {
	return fetch(`${SERVER_URL}/api/questions/${question._id}`, {
		...defaultHeaders,
		method: "PUT",
		body: JSON.stringify(question),
	}).then(checkStatus);
};

export const deleteQuestionByIdAPI = questionId => {
	return fetch(`${SERVER_URL}/api/questions/${questionId}`, {
		...defaultHeaders,
		method: "DELETE",
	})
		.then(checkStatus)
		.then(parseJSON);
};

//helpers

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		return response.statusMessage;
	}
}

function parseJSON(response) {
	return response.json();
}
