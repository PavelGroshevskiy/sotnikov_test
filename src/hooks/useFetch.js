import axios from "axios";
import { useEffect, useReducer, useRef } from "react";

import { useState } from "react";

export const useFetching = (callback) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const fetching = async (...args) => {
		try {
			setIsLoading(true);
			await callback(...args);
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return [fetching, isLoading, error];
};

export function useFetch(url, limit, page) {
	const cache = useRef({});

	const cancelRequest = useRef(false);

	const initialState = {
		error: undefined,
		response: undefined,
		totalCountPost: undefined,
	};

	const fetchReducer = (state, action) => {
		switch (action.type) {
			case "loading":
				return { ...initialState };
			case "fetched":
				return { ...initialState, response: action.payload };
			case "error":
				return { ...initialState, error: action.payload };
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		if (!url) return;

		cancelRequest.current = false;

		const fetchData = async () => {
			dispatch({ type: "loading" });

			if (cache.current[url]) {
				dispatch({ type: "fetched", payload: cache.current[url] });
				return;
			}

			try {
				const response = await axios.get(url, { params: { _limit: limit, _page: page } });
				if (response.status !== 200) {
					throw new Error(response.statusText);
				}

				cache.current[url] = response.data;
				if (cancelRequest.current) return;

				dispatch({ type: "fetched", payload: response });
			} catch (error) {
				if (cancelRequest.current) return;

				dispatch({ type: "error", payload: error });
			}
		};

		void fetchData();

		return () => {
			cancelRequest.current = true;
		};
	}, [url, page]);

	return state;
}
