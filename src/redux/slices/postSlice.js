import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URI = "http://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	page: 1,
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
	modal: { status: false, id: null },
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
	const { page, limit } = params;
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
		setPageFromRedux(state, action) {
			state.page = action.payload;
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
		changePost(state, action) {
			state.posts.map((post) => {
				if (post.id === action.payload.id) {
					post.body = action.payload.body;
					post.title = action.payload.title;
				}
				state.modal.status = false;
			});
		},
		openModal(state, action) {
			state.modal.status = action.payload.status;
			state.modal.id = action.payload.id;
		},
		setFilter(state, action) {
			state.page = action.payload;
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
export const getPage = (state) => state.posts.page;
export const getModalStatus = (state) => state.posts.modal;

export const { reactionAdded, setPageFromRedux, openModal, changePost, setFilter } =
	postSlice.actions;

export default postSlice.reducer;
