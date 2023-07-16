import { useDispatch } from "react-redux";
import { reactionAdded } from "../../redux/slices/postSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😮",
	heart: "❤️",
	rocket: "🚀",
	coffee: "☕",
};

const PostReaction = ({ post }) => {
	const dispatch = useDispatch();

	const Postreaction = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type="button"
				className="reactionButton"
				onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}
			>
				{emoji} {post.reactions[name]}
			</button>
		);
	});

	return <div>{Postreaction}</div>;
};
export default PostReaction;
