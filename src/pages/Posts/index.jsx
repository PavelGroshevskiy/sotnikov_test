import React from "react";
import { Pagination } from "antd";
import qs from "qs";

import {
	fetchPosts,
	getAllPost,
	getPostStatus,
	getPostErorr,
	getCountOfPosts,
	setPageFromRedux,
	getPage,
	setFilter,
} from "../../redux/slices/postSlice";

import { fetchUsers } from "../../redux/slices/userSlice";

import PostList from "../../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/slices/commentsSlice";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

function Posts() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const posts = useSelector(getAllPost);
	const postStatus = useSelector(getPostStatus);
	const postErorr = useSelector(getPostErorr);
	const countOfPosts = useSelector(getCountOfPosts);
	const page = useSelector(getPage);

	const [limit, setLimit] = React.useState(10);
	const [pageSize, setPageSize] = React.useState(10);

	React.useEffect(() => {
		if (window.location.search) {
			const searchParametr = qs.parse(window.location.search.substring(1));
			console.log(Object.entries(searchParametr));
			dispatch(setFilter(searchParametr.page));
			// dispatch(setFilter(searchParametr.page));
		}
	}, []);

	React.useEffect(() => {
		dispatch(fetchPosts({ page, limit }));
		dispatch(fetchUsers());
		dispatch(fetchComments());
	}, [page, limit]);

	React.useEffect(() => {
		const queryString = qs.stringify({
			page,
		});
		navigate(`?${queryString}`);
	}, [page]);

	const handlePageSizeChange = (current, pageSize) => {
		setPageSize(pageSize);
		setLimit(pageSize);
	};

	const changePage = (pageNumber) => {
		dispatch(setPageFromRedux(pageNumber));

		window.scrollTo(0, 0);
	};

	if (postStatus === "loading") return "...Loading";
	if (postStatus === "success") {
		return (
			<>
				<Modal />
				<PostList posts={posts} />
				<Pagination
					current={page}
					onChange={changePage}
					showSizeChanger
					pageSize={pageSize}
					onShowSizeChange={handlePageSizeChange}
					defaultCurrent={1}
					total={countOfPosts}
					responsive={true}
				/>
			</>
		);
	}
	if (postStatus === "Erorr") return <p>{postErorr}</p>;
}

export default Posts;
