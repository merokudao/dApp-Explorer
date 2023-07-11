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

	let child;
	child = <AppList data={items}></AppList>;

	let emptyLoading;
	emptyLoading = (
		<Column className="flex items-center w-full gap-y-4 justify-center h-screen">
			<p className="text-md text-center">loading results ...</p>
		</Column>
	);

	return (
		<PageLayout>
			<h1 className="text-[24px] leading-[32px] lg:text-4xl mb-8 capitalize">
				search results for {router.query.search}
			</h1>
			<>{items.length > 0 ? child : emptyLoading}</>
		</PageLayout>
	);
}
