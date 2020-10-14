const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI || "mongodb://localhost/wikiDB";
const port = process.env.PORT || 4000;
console.log(mongoURI);

mongoose.connect(mongoURI, {
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
			title: req.query.title,
			content: req.query.content,
		});

		article.save((err): void => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully added a new article!');
			}
		});
	})

	.delete((req, res) => {
		Article.deleteMany({}, (err): void => {
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
	.get((req, res): void => {
		Article.findOne({ title: req.params.articleTitle }, (err, response) => {
			if (response) {
				res.send(response);
			} else {
				res.send('No article found.');
			}
		});
	})

	.put((req, res): void => {
		Article.findOneAndUpdate(
			{ title: req.params.articleTitle },
			{ title: req.query.title, content: req.query.content },
			(err, response) => {
				if (err) {
					res.send(err);
				} else {
					res.send('Successfully updated!');
				}
			},
		);
	})

	.patch((req, res): void => {
		Article.findOneAndUpdate(
			{ title: req.params.articleTitle },
			{ $set: req.query },
			(err, response) => {
				if (err) {
					res.send(err);
				} else {
					res.send('Successfully updated!');
				}
			},
		);
	})

	.delete((req, res): void => {
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

app.listen(port, (): void => {
	console.log(`Server started at port ${port}.`);
});
