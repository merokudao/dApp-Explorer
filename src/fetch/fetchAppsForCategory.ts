import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.API_HOST;

type FetchAppsProps = {
	category: string;
	subCategory: string;
};

export async function fetchAppsForCategory(category, subCategory) {
	const res = await fetch(
		`${MEROKU_BASE_URL}/${ApiEndpoints.APP_LIST}?limit=300&categories=${category}&subCategory=${subCategory}`,
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
