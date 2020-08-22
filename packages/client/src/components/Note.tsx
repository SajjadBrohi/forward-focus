import React from 'react';

interface Props {
	id: number;
	title: string;
	content: string;
}

function Note(props: Props) {
	return (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{props.content}</p>
		</div>
	);
}

export default Note;
