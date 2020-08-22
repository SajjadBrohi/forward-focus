import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
// import notes from './Notes';

interface Note {
	key: number;
	title: string;
	content: string;
}

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [post, setPost] = useState({
		title: '',
		content: '',
	});

	function newPost(title: string, content: string) {
		console.log(title, content);
	}

	return (
		<div>
			<Header /> <CreateArea postFunction={newPost} /> <Footer />
			{notes.map((note) => (
				<Note id={note.key} title={note.title} content={note.content} />
			))}
		</div>
	);
}

export default App;
