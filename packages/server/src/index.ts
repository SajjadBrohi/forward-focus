const express = require('express');
const app = express();

console.log('hi');

console.log('hello');

app.get('/', (req, res): void => {
	res.sendFile(__dirname + 'index.html');
});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
