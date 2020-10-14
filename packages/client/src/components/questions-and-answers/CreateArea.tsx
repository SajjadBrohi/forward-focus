import React, { useState } from 'react';
import fetchCall from './FetchCall';

interface Props {
	postFunction: (post: Post) => void;
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
		setPost((prevVal) => {
			return {
				...prevVal,
				[name]: value,
			};
		});
	}

	function submitForm(event: any) {
		if (post.title !== '') {
			props.postFunction(post);
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
					placeholder="Question Summary"
					value={post.title}
				/>
				<textarea
					onChange={updatePost}
					name="content"
					placeholder="Details"
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
