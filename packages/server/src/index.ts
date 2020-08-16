const HDS = document.querySelector('h1');

const express = require('express');
const app = express();

app.get('/', (req, res): void => {
	res.sendFIle(__dirname + 'index.html');
});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
