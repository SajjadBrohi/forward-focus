import React, { useState } from 'react';
import './App.css';
import Header from './components/questions-and-answers/Header';
import Footer from './components/questions-and-answers/Footer';
import Note from './components/questions-and-answers/Note';
import CreateArea from './components/questions-and-answers/CreateArea';
import fetchCall from './components/questions-and-answers/FetchCall';

interface Note {
	key: number;
	title: string;
	content: string;
}

interface Post {
	title: string;
	content: string;
}

const reactURI = process.env.REACT_URI || "localhost";

async function fetchNotes() {
	const response = await fetch(`http://${reactURI}:4000/articles`);

	const libraryCapacity = await response.json();
	return libraryCapacity;
}

function App() {
	const [notes, setNotes] = useState<Note[]>([]);

	fetchNotes().then((fetchedNotes) => {
		setNotes(fetchedNotes);
	});
	
	function newPost(post: Post) {
		setNotes((prevValue: any) => {
			return [...prevValue, post];
		});
	}

	function deletePost(id: number) {
		notes.forEach((note, index) => index === id ? fetchCall(note.title, '', 'DELETE') : '');

		setNotes((prevValue: any) => {
			return prevValue.filter((post: any, index: number) => index !== id);
		});
	}

	return (
		<div>
			<Header /> <CreateArea postFunction={newPost} /> <Footer />
			{notes.map((note, index) => (
				<Note
					id={index}
					title={note.title}
					content={note.content}
					deleteFunction={deletePost}
				/>
			))}
		</div>
	);
}

export default App;
