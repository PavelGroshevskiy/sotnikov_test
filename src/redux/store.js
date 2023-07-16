import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/postSlice";
import users from "./slices/userSlice";

export const store = configureStore({
	reducer: {
		posts,
		users,
	},
});
