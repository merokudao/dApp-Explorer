import { useRouter } from "next/router";
import CategoriesList from "../categories";
import { AppList, PageLayout } from "@/components";
import { fetchSearchResults } from "../../fetch/fetchSearchResults";

export default function SearchPage({ items }) {
	const router = useRouter();

	let child;
	child = <AppList data={items}></AppList>;
	return (
		<PageLayout>
			<h1 className="text-[24px] leading-[32px] lg:text-4xl mb-8 capitalize">
				search results for {router.query.search}
			</h1>
			<>{items.length > 0 ? child : <div />}</>
		</PageLayout>
	);
}

export async function getServerSideProps(ctx) {
	const { search } = ctx.query;

	const apps = await fetchSearchResults(search);

	return {
		props: {
			items: apps,
		},
	};
}
