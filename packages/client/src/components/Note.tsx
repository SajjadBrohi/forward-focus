import React from 'react';

interface Props {
	id: number;
	title: string;
	content: string;
	deleteFunction: any;
}

function Note(props: Props) {
	return (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<button
				onClick={() => {
					props.deleteFunction(props.id);
				}}
			>
				DELETE
			</button>
		</div>
	);
}

export default Note;
