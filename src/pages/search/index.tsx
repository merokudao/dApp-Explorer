import { AppList, PageLayout } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Column } from "../../components/layout/flex";
import { fetchSearchResults } from "../../fetch/fetchSearchResults";

export default function SearchPage() {
	const router = useRouter();
	const [items, setItems] = useState([]);

	useEffect(() => {
		const searchWord = router.query.search;
		if (typeof searchWord === "string") {
			fetchSearchResults(searchWord).then((res) => {
				setItems(res);
			});
		}
	}, [router.query.search]);

	if (items.length === 0) {
		return (
			<PageLayout>
				<Column className="flex items-center w-full gap-y-4 justify-center h-screen">
					<p className="text-md text-center">Loading results ...</p>
				</Column>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<h1 className="text-[24px] leading-[32px] lg:text-4xl mb-8 capitalize">
				search results for {router.query.search}
			</h1>
			<AppList data={items}></AppList>
		</PageLayout>
	);
}
