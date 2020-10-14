import React, { useState } from 'react';
import fetchCall from '../FetchCall';

interface Props {
	deleteFunction: (id: number) => void;
}

interface Post {
	title: string;
	content: string;
}

function CreateArea(props: Props) {
	const [post, setPost] = useState<Post>({
		title: '',
		content: '',
	});

	function updatePost(event: any) {
		const { name, value } = event.target;
		setPost((prevVal: any) => {
			return {
				...prevVal,
				[name]: value,
			};
		});
	}

	function submitForm(event: any) {
		if (post.title !== '') {
			fetchCall(post.title, post.content, 'POST');	
		}
		setPost({
			title: '',
			content: '',
		});
		event.preventDefault();
	}

	return (
		<div>
			<form className="create-note">
				<input
					onChange={updatePost}
					name="title"
					placeholder="Note Title"
					value={post.title}
				/>
				<textarea
					onChange={updatePost}
					name="content"
					placeholder="Content"
					rows={3}
					value={post.content}
				/>
				<button
					onClick={(e: any) => {
						submitForm(e);
					}}
				>
					Add
				</button>
			</form>
		</div>
	);
}
export default CreateArea;
