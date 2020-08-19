const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({ extended: true }));

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

app.get('/articles', (req, res): void => {
	Article.find({}, (err, foundArticles) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundArticles);
		}
	});
});

app.post('/articles', (req, res): void => {
	const article = new Article({
		title: req.body.title,
		content: req.body.content,
	});

	article.save();
});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
