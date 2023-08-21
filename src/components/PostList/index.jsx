import React from "react";

import PostItem from "./PostItem";
import styles from "./index.module.scss";

function PostList({ posts, users }) {
	return (
		<div>
			{posts.map((post, id) => {
				return <PostItem post={post} key={id} />;
			})}
		</div>
	);
}

export default PostList;
