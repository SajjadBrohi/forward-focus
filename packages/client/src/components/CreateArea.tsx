import React, { useState } from 'react';

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
		props.postFunction(post);
		setPost({
			title: '',
			content: '',
		});
		event.preventDefault();
	}

	return (
		<div>
			<form>
				<input
					onChange={updatePost}
					name="title"
					placeholder="Title"
					value={post.title}
				/>
				<textarea
					onChange={updatePost}
					name="content"
					placeholder="Take a note..."
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
