import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/notes/Note';
import CreateArea from './components/notes/CreateArea';
import fetchCall from './components/FetchCall';

interface Note {
	key: number;
	title: string;
	content: string;
}

interface Post {
	title: string;
	content: string;
}

let startTimeInterval = false;

async function fetchNotes() {
	let reactURI = window.location.href.split(':');
	let updatedReactURI = reactURI.slice(0, reactURI.length - 1).join(":");
	const response = await fetch(`${updatedReactURI}:4000/notes`);

	const libraryCapacity = await response.json();
	return libraryCapacity;
}

function App() {
	const [notes, setNotes] = useState<Note[]>([]);

	if (!startTimeInterval) {
		setInterval(()=> {
			fetchNotes().then((fetchedNotes) => {
				setNotes(fetchedNotes);
			});
		}, 50)
		startTimeInterval = true;
	}

	function deletePost(id: number) {
		notes.forEach((note: any, index: any) => index === id ? fetchCall(note.title, '', 'DELETE') : '');
	}

	return (
		<div>
			{/* <Header />  */}
			<CreateArea deleteFunction={deletePost} /> <Footer />
			{notes.map((note: any, index: any) => (
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
