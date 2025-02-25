import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.API_HOST;

export async function fetchAppById(id: string) {
	// console.log(`${MEROKU_BASE_URL}/dapp/search/${id}`);
	const res = await fetch(`${MEROKU_BASE_URL}/dapp/search/${id}`, {
		headers: {
			apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
		},
	});
	const response = await res.json();
	const apps = response.data;

	return apps;
}
