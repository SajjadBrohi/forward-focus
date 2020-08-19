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
const mango = new Article({
	title: 'Mango goes sour',
	content: 'It is true that Mangoes go sour.',
});
mango.save();
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.listen(3000, () => {
	console.log('Server started at port 3000.');
});
