import React from "react";
import { useSelector } from "react-redux";
import { getComments } from "../../redux/slices/commentsSlice";

const PostComments = ({ post, show }) => {
	const comments = useSelector(getComments);

	const findPostCommentArr = comments.filter((comment) => {
		return comment.postId === post.id;
	});

	return (
		<>
			{show &&
				findPostCommentArr?.map((el, id) => (
					<div key={id}>{`Name:${el.name}  
				Email:${el.email}`}</div>
				))}
		</>
	);
};

export default PostComments;
