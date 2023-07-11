// https://api.meroku.store/api/v1/dapp?search=${search}

import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export async function fetchSearchResults(searchWord: string) {
	const res = await fetch(
		`${MEROKU_BASE_URL}/${ApiEndpoints.SEARCH}?search=${searchWord}`,
		{
			headers: {
				apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
			},
		}
	);
	const response = await res.json();
	const apps = response.data;

	return apps;
}
