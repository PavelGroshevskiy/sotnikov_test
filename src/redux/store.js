import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/postSlice";
import users from "./slices/userSlice";
import comments from "./slices/commentsSlice";

export const store = configureStore({
	reducer: {
		posts,
		users,
		comments,
	},
});
