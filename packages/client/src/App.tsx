import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
import notes from './Notes';
function App() {
	return (
		<div>
			<Header /> <CreateArea /> <Footer />
			{notes.map((note) => (
				<Note id={note.key} title={note.title} content={note.content} />
			))}
		</div>
	);
}

export default App;
