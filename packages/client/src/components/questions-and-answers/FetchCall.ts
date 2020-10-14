
async function apiPostNote(title: string, content: string, httpMethod: string) {
	let reactURI = window.location.href.split(':');
	let updatedReactURI = reactURI.slice(0, reactURI.length - 1).join(":");
	console.log(updatedReactURI);

	if (httpMethod === 'DELETE') {
		let response = await fetch(
			`http://${updatedReactURI}:4000/articles/${title}`,
			{
				method: httpMethod,
			},
		);
		return response.status;
	} else {
		let response = await fetch(
			`http://${updatedReactURI}:4000/articles?title=${title}&content=${content}`,
			{
				method: httpMethod,
			},
		);
		return response.status;
	}
}

export default apiPostNote;