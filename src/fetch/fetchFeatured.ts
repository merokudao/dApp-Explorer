import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.API_HOST;

export async function fetchFeatured() {
	const res = await fetch(`${MEROKU_BASE_URL}/${ApiEndpoints.FEATURED}`, {
		headers: {
			apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
		},
	});
	const data = await res.json();

	const featuredkey = process.env.NEXT_FEATURED_APP_KEY
	const merokuFeaturedExplorer = data.find(
		(item) => item.key === featuredkey
	);

	const appIds = merokuFeaturedExplorer ? merokuFeaturedExplorer.dappIds : [];
	const result = <any>[];
	// console.log(appIds);
	for (const idx in appIds) {
		const appReq = await fetch(
			`${MEROKU_BASE_URL}/dapp/search/${appIds[idx]}`,
			{
				headers: {
					apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
				},
			}
		);

		// console.log(appReq);
		try {
			const response = await appReq.json();
			result.push(response.data[0]);
		} catch {
			console.log("error");
			continue;
		}
	}
	return result;
}
