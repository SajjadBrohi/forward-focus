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

/////////////////////////////////////////// Requests Targetting All Articles ///////////////////////////////////////////

app
	.route('/articles')
	.get((req, res): void => {
		Article.find({}, (err, foundArticles) => {
			if (err) {
				res.send(err);
			} else {
				res.send(foundArticles);
			}
		});
	})

	.post((req, res): void => {
		const article = new Article({
			title: req.body.title,
			content: req.body.content,
		});

		article.save((err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully added a new article!');
			}
		});
	})

	.delete((req, res) => {
		Article.deleteMany({}, (err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully deleted!');
			}
		});
	});

/////////////////////////////////////////// Requests Targetting a Specific Article ///////////////////////////////////////////

app
	.route('/articles/:articleTitle')
	.get((req, res) => {
		Article.findOne({ title: req.params.articleTitle }, (err, response) => {
			if (response) {
				res.send(response);
			} else {
				res.send('No articles found.');
			}
		});
	})

	.put((req, res) => {
		Article.findOneAndUpdate(
			{ title: req.params.articleTitle },
			{ title: req.body.title, content: req.body.content },
			(err, response) => {
				if (err) {
					res.send(err);
				} else {
					res.send('Successfully updated!');
				}
			},
		);
	})

	.patch((req, res) => {
		Article.findOneAndUpdate(
			{ title: req.params.articleTitle },
			{ $set: req.body },
			(err, response) => {
				if (err) {
					res.send(err);
				} else {
					res.send('Successfully updated!');
				}
			},
		);
	})

	.delete((req, res) => {
		Article.findOneAndDelete(
			{ title: req.params.articleTitle },
			(err, response) => {
				if (err) {
					res.send(err);
				} else {
					res.send('Successfully deleted!');
				}
			},
		);
	});

app.listen(3000, (): void => {
	console.log('Server started at port 3000.');
});
