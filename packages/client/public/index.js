const fetch = require('node-fetch');

async function apiPostNote(title) {
	let response = await fetch(`http://localhost:4000/articles/${title}`, {
		method: 'DELETE',
	});

	// const libraryCapacity = await .json();
	return response.status;
}

apiPostNote('Something22').then((x) => console.log(x));
