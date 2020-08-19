const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/wikiDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const Article = mongoose.model('Article', articleSchema);

app.get('/', (req, res): void => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
