import React from "react";
import { Pagination } from "antd";

import { useFetching } from "../../hooks/useFetch";
import { ROUTES, URL } from "../../consts/consts";

import PostList from "../../components/PostList";
import { getPageCount } from "../../utils/countPages";
import axios from "axios";

function Posts() {
	const [limit, setLimit] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);
	const [posts, setPosts] = React.useState([]);
	// const [totalPage, setTotalPage] = React.useState(0);
	const [countOfPosts, setCountofPosts] = React.useState(0);

	const [fetching, isLoading, error] = useFetching(async () => {
		const response = await axios.get(URL + ROUTES.POSTS, {
			params: { _limit: limit, _page: page },
		});
		const total = response.headers["x-total-count"];
		setCountofPosts(total);
		setPosts(response.data);
		// setTotalPage(getPageCount(total, limit));
	});

	React.useEffect(() => {
		fetching();
	}, [limit, page]);

	console.log("Posts rerender");

	const handlePageSizeChange = (current, pageSize) => {
		setPageSize(pageSize);
		setLimit(pageSize);

		console.log(current, pageSize);
	};

	const changePage = (pageNumber) => {
		setPage(pageNumber);

		window.scrollTo(0, 0);
	};

	if (error) return <p>There is an error.</p>;

	return (
		<>
			{isLoading ? (
				"...Loading"
			) : (
				<>
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
			)}
		</>
	);
}

export default Posts;
