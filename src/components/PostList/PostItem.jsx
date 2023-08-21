import styles from "./PostItem.module.scss";
import PostReaction from "./PostReactions";
import PostAuthor from "./PostAuthor";
import Button from "../../UI/Button";
import PostComments from "./PostComments";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getModalStatus, openModal } from "../../redux/slices/postSlice";

function PostItem({ post }) {
	const [showComments, setShowComments] = React.useState(false);
	const { status } = useSelector(getModalStatus);

	const dispatch = useDispatch();

	const onClickButtonComment = () => setShowComments(!showComments);

	return (
		<div className={styles.root}>
			<div className={styles.title}>{post.title}</div>
			<div>{post.body}</div>
			<PostReaction post={post} />
			<PostAuthor post={post} />
			<div className={styles.postItenButtons}>
				<Button
					className={showComments ? styles.buttonNoActive : styles.buttonActive}
					onClick={onClickButtonComment}
				>
					Комментарии
				</Button>
				<Button
					onClick={() => {
						dispatch(openModal({ status: !status, id: post.id }));
					}}
				>
					Редактировать
				</Button>
			</div>
			<PostComments show={showComments} post={post} />
		</div>
	);
}

export default PostItem;
