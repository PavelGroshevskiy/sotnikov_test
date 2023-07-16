import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

let endpoints = [
	"http://jsonplaceholder.typicode.com/posts",
	"http://jsonplaceholder.typicode.com/users",
	"http://jsonplaceholder.typicode.com/todos",
	"http://jsonplaceholder.typicode.com/albums",
];

const POST_URI = "http://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	status: "idle",
	erorr: null,
	reactions: {
		thumbsUp: 0,
		wow: 0,
		heart: 0,
		rocket: 0,
		coffee: 0,
	},
	countOfPosts: 0,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
	const { page, limit } = params;
	console.log(params);
	const response = await axios.get(POST_URI, {
		params: {
			_limit: limit,
			_page: page,
		},
	});

	return { responseData: response.data, responseHeader: response.headers };
});

const postSlice = createSlice({
	name: "postSlice",
	initialState,
	reducers: {
		change() {},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
	extraReducers(bulder) {
		bulder.addCase(fetchPosts.pending, (state, action) => {
			state.status = "loading";
		});

		bulder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = "success";
			let min = 1;
			const loadedPosts = action.payload.responseData.map((post) => {
				post.date = sub(new Date(), { minutes: min++ }).toISOString();
				post.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};

				return post;
			});

			state.posts = loadedPosts;
			state.countOfPosts = action.payload.responseHeader["x-total-count"];
		});

		bulder.addCase(fetchPosts.rejected, (state, action) => {
			state.status = "Error";
			state.posts = [];

			state.erorr = action.error.message;
		});
	},
});

export const getAllPost = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostErorr = (state) => state.posts.erorr;
export const getCountOfPosts = (state) => state.posts.countOfPosts;

export const { reactionAdded, setAllData } = postSlice.actions;

export default postSlice.reducer;
