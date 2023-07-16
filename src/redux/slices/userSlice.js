import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_USERS = "https://jsonplaceholder.typicode.com/users";

const initialState = {
	users: [],
	status: "idle",
	error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await axios.get(URL_USERS);
	return response.data;
});

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {},
	extraReducers(bulder) {
		bulder.addCase(fetchUsers.pending, (state, action) => {
			state.users = [];
			state.status = "loading";
		});
		bulder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload;
		});
		bulder.addCase(fetchUsers.rejected, (state, action) => {
			state.users = [];
			state.error = action.error;
		});
	},
});

export const {} = userSlice.actions;

export const getUsers = (state) => state.users.users;

export default userSlice.reducer;
