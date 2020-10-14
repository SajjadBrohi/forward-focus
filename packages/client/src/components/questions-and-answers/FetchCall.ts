
async function apiPostNote(title: string, content: string, httpMethod: string) {
	const reactURI = process.env.REACT_URI || "localhost";
	if (httpMethod === 'DELETE') {
		let response = await fetch(
			`http://${reactURI}:4000/articles/${title}`,
			{
				method: httpMethod,
			},
		);
		return response.status;
	} else {
		let response = await fetch(
			`http://${reactURI}:4000/articles?title=${title}&content=${content}`,
			{
				method: httpMethod,
			},
		);
		return response.status;
	}
}

export default apiPostNote;