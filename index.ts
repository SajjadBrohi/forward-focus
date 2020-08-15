const express = require('express');
const app = express();

app.get('/', (req, res): void => {
	res.sendFIle('index.html');
});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
