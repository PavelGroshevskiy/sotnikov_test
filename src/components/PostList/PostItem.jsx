import { useSelector } from "react-redux";
import styles from "./PostItem.module.scss";
import PostReaction from "./PostReactions";
import PostAuthor from "./PostAuthor";

function PostItem({ post }) {
	return (
		<div className={styles.root}>
			<div className={styles.title}>{post.title}</div>
			<div>{post.body}</div>
			<PostReaction post={post} />
			<PostAuthor post={post} />
		</div>
	);
}

export default PostItem;
