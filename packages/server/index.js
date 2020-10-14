const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/forwardFocusDb';
const port = process.env.PORT || 4000;

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const Note = mongoose.model('Note', noteSchema);

/*
		Requests Targetting all Notes	
*/

app
	.route('/notes')
	.get((req, res) => {
		Note.find({}, (err, foundNotes) => {
			if (err) {
				res.send(err);
			} else {
				res.send(foundNotes);
			}
		});
	})

	.post((req, res) => {
		const note = new Note({
			title: req.query.title,
			content: req.query.content,
		});

		note.save((err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully added a new note!');
			}
		});
	})

	.delete((req, res) => {
		Note.deleteMany({}, (err) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully deleted!');
			}
		});
	});

/*
		Requests Targetting a Specific Note	
*/

app
	.route('/notes/:noteTitle')
	.get((req, res) => {
		Note.findOne({ title: req.params.noteTitle }, (err, response) => {
			if (response) {
				res.send(response);
			} else {
				res.send('No note found.');
			}
		});
	})

	.put((req, res) => {
		Note.findOneAndUpdate(
			{ title: req.params.noteTitle },
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

	.patch((req, res) => {
		Note.findOneAndUpdate(
			{ title: req.params.noteTitle },
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

	.delete((req, res) => {
		Note.findOneAndDelete({ title: req.params.noteTitle }, (err, response) => {
			if (err) {
				res.send(err);
			} else {
				res.send('Successfully deleted!');
			}
		});
	});

app.listen(port, () => {
	console.log(`Server started at port ${port}.`);
});
