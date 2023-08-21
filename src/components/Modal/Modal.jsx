import React, { useEffect } from "react";
import style from "./Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	changePost,
	getAllPost,
	getModalStatus,
	openModal,
} from "../../redux/slices/postSlice";
import MyInput from "../../UI/MyInput/MyInput";
import Button from "../../UI/Button";

const Modal = () => {
	const { status, id } = useSelector(getModalStatus);
	const dispatch = useDispatch();
	const posts = useSelector(getAllPost);

	const findPost = posts.find((post) => post.id === id);

	const [title, setTitle] = React.useState("");
	const [body, setBody] = React.useState("");

	useEffect(() => {}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		const updatePost = Object.fromEntries(formData);

		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify(updatePost),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => dispatch(changePost(data)));
	};

	const rootClass = [style.modal];

	if (status) {
		rootClass.push(style.modalActive);
	}

	return (
		<div
			className={rootClass.join(" ")}
			onClick={() => {
				dispatch(openModal({ status: false }));
			}}
		>
			<div
				className={style.modalContent}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<form onSubmit={handleSubmit}>
					{console.log(findPost)}
					<MyInput
						name="title"
						value={title}
						defaultValue={findPost && findPost.title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<div>
						<MyInput
							name="body"
							defaultValue={findPost && findPost.body}
							onChange={(e) => {
								setBody(e.target.value);
							}}
						/>
					</div>
					<Button type="submit">Submit</Button>
					<Button type="reset">Reset</Button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
