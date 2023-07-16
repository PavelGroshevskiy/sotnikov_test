import React from "react";
import { Pagination } from "antd";

import {
	fetchPosts,
	getAllPost,
	getPostStatus,
	getPostErorr,
	getCountOfPosts,
} from "../../redux/slices/postSlice";

import { fetchUsers, getUsers } from "../../redux/slices/userSlice";

import PostList from "../../components/PostList";
import { useDispatch, useSelector } from "react-redux";

function Posts() {
	const dispatch = useDispatch();

	const posts = useSelector(getAllPost);
	const postStatus = useSelector(getPostStatus);
	const postErorr = useSelector(getPostErorr);
	const countOfPosts = useSelector(getCountOfPosts);
	const users = useSelector(getUsers);

	const [limit, setLimit] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	React.useEffect(() => {
		dispatch(fetchPosts({ page, limit }));
		dispatch(fetchUsers());
	}, [page, limit]);

	const handlePageSizeChange = (current, pageSize) => {
		setPageSize(pageSize);
		setLimit(pageSize);
	};

	const changePage = (pageNumber) => {
		setPage(pageNumber);

		window.scrollTo(0, 0);
	};
	if (postStatus === "loading") return "...Loading";
	if (postStatus === "success") {
		return (
			<>
				<PostList posts={posts} users={users} />
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
