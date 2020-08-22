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

interface Post {
	title: string;
	content: string;
}
function App() {
	const [notes, setNotes] = useState<Note[]>([]);

	function newPost(post: Post) {
		setNotes((prevValue: any) => {
			return [...prevValue, post];
		});
	}

	function deletePost(id: number) {
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
