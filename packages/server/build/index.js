const express = require('express');
const app = express();
console.log(__dirname + '');
app.get('/', (req, res) => {
	res.sendFile();
});
app.listen(3000, () => {
	console.log('Server started at port 3000.');
});
