import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.API_HOST;

export async function fetchAppById(id: string) {
	console.log(`${MEROKU_BASE_URL}/dapp/search/${id}`);
	const res = await fetch(`${MEROKU_BASE_URL}/dapp/search/${id}`, {
		headers: {
			apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
		},
	});
	// const response = await res.json();
	// const apps = response.data;

	console.log("res from fetchappbyid", res);

	const buffer = await res.arrayBuffer(); // Get the response as an ArrayBuffer
	const decoder = new TextDecoder("utf-8"); // Create a TextDecoder with the correct encoding
	const decodedData = decoder.decode(buffer); // Decode the response using the TextDecoder
	const data = JSON.parse(decodedData); // Parse the decoded response as JSON

	return data;
}
