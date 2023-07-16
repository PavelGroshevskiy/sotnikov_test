import React from "react";
import { getUsers } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

const PostAuthor = ({ post }) => {
	const users = useSelector(getUsers);

	const userName = users.find((user) => user.id === post.userId);
	return <div>{userName?.name}</div>;
};

export default PostAuthor;
