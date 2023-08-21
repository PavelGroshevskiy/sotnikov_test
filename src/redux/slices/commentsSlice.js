import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	comments: [],
	status: "idle",
	error: null,
};

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
	const response = await axios.get("https://jsonplaceholder.typicode.com/comments");

	return response.data;
});

const commentsSlice = createSlice({
	name: "commentsSlice",
	initialState,
	reducers: {},
	extraReducers(bulder) {
		bulder.addCase(fetchComments.pending, (state, action) => {
			state.comments = [];

			state.status = "Loading";
		});
		bulder.addCase(fetchComments.fulfilled, (state, action) => {
			state.comments = action.payload;

			state.status = "success";
		});
		bulder.addCase(fetchComments.rejected, (state, action) => {
			state.comments = [];
			state.status = "Recive error";
			state.error = action.error.message;
		});
	},
});

export const {} = commentsSlice.actions;

export const getComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
