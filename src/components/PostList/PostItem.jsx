import styles from "./PostItem.module.scss";

function PostItem({ post }) {
	return (
		<div className={styles.root}>
			<div className={styles.title}>{post.title}</div>
			<div>{post.body}</div>
		</div>
	);
}

export default PostItem;
