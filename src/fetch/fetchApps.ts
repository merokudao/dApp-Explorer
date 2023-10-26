import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

export async function fetchApps() {
	const res = await fetch(
		`${MEROKU_BASE_URL}/${ApiEndpoints.APP_LIST}?limit=100`,
		{
			headers: {
				apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
			},
		}
	);
	const data = await res.json();
	const apps = data.response;

	return apps;
}
