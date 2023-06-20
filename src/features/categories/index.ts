/*
this file contains a mapping from meroku categories to dappstore categories and all the necessary conversions
*/
var dappstoreMaping = `{
	"Dev Tools": "developer-tools",
	"Dev Tools.Security": "developer-tools.security",
	"Dev Tools.Monitoring": "developer-tools.monitoring",
	"Dev Tools.Storage": "developer-tools.storage",
	"Dev Tools.Front Ends": "developer-tools.front-ends",
	"Dev Tools.Messaging": "social-networking.messaging",
	"Dev Tools.Block Explorers": "developer-tools.block-explorer",
	"Dev Tools.Indexer": "developer-tools.indexer",

    "Social": "social-networking",

    "Infrastructure": "developer-tools.developer-infra",
	"Infrastructure.Oracles": "developer-tools.oracle",
	"Infrastructure.Node Infra": "developer-tools.node-infra",
	"Infrastructure.Bridges": "developer-tools.bridges",
	"Infrastructure.Identity": "developer-tools.identity",
	"Infrastructure.Analytics": "developer-tools.analytics",

    "Gaming": "games",
	"Gaming.Puzzle and strategy games": "games.puzzle",
	"Gaming.Action and adventure games": "games.adventure",
	"Gaming.First-person action games": "games.action",
	"Gaming.Role-playing games (RPG)": "games.role-playing",
	"Gaming.Sports and racing games": "games.racing",
	"Gaming.Simulation games": "games.simulation",
	"Gaming.Studios": "games.studios",
	"Gaming.Metaverse": "games.metaverse",

    "NFT": "nft",
	"NFT.Marketplace": "nft.marketplaces",
	"NFT.Music": "entertainment.music",
	"NFT.Domain Names": "nft.domain-names",
	"NFT.PFPs": "nft.pfps",
	"NFT.Social Graph": "social.social-graph",
	"NFT.Art": "nft.art",
	"NFT.Tooling / Infra": "nft.tooling",

	"Productivity": "productivity",
    "Productivity:DAO": "productivity.decentralized-collaboration-tools",
	"Productivity:DAO Investing": "productivity.decentralized-collaboration-tools-investing",
	"Productivity:DAO Tooling": "productivity.decentralized-collaboration-tools-tools",
	"Productivity:DAO - Misc": "productivity.decentralized-collaboration-tools-misc",

    "Finance": "finance.defi",
	"Finance.Stablecoins": "finance.stablecoins",
	"Finance.Decentralized Exchanges": "finance.exchanges",
	"Finance.Lending and Borrowing": "finance.lending-and-borrowing",
	"Finance.Liquid Staking": "finance.liquid-staking",
	"Finance.Yield Aggregation / Farming": "finance.farming",
	"Finance.Real World Assets / Tokenization": "finance.tokenization",
	"Finance.Insurance": "finance.insurance",
	"Finance.Payments": "finance.payments",
	"Finance.Prediction Markets": "finance.prediction-markets",
	"Finance.DeFi - Other": "defi.others",
	"Finance.On-Ramp/Off-Ramp": "defi.ramp",
	"Finance.Trading": "defi.trading",

    "Business": "business",

    "Utilities": "utilities",
	"Utilities:Wallets": "utilities.wallets",

  	"Education" : "education"
}`;
// var merokuAPIData = JSON.parse(merokuJsonString).data;
var dappstoreMapingData = JSON.parse(dappstoreMaping);
// var merokuCategoryList: string[] = [];
var polygonMappedList: string[] = [];

// merokuAPIData.map((e) => merokuCategoryList.push(e.category));

(Object.values(dappstoreMapingData) as string[]).map((e) => {
	polygonMappedList.push(e.split(".")[0]);
});

// var othersList: string[] = merokuCategoryList.filter(
//   (value) => !polygonMappedList.includes(value.toLowerCase())
// );

interface CatSubCat {
	category: string | string[];
	subCategory?: string;
}

// Create a Map object to be passed
const customToMerokuMapping: Map<string, string> = new Map(
	Object.entries(JSON.parse(dappstoreMaping))
);

/**
 * mapping: A Map that contains mapping from custom's Category and Sub Category to Meroku's Category and Sub Category
 *
 */

const customToMerokuCategory = (
	category: string | string[] | undefined,
	merokuData: any,
	subCategory?: string | string[] | undefined
): CatSubCat => {
	let output: CatSubCat = { category: "" };
	var merokuCategoryList: string[] = [];

	if (merokuData !== undefined) {
		merokuData.data.map((e) => merokuCategoryList.push(e.category));
		var othersList: string[] = merokuCategoryList.filter(
			(value) => !polygonMappedList.includes(value.toLowerCase())
		);
		if (category === "Others") {
			output["category"] = othersList;
		}
	}

	const mapping = customToMerokuMapping;

	const key = subCategory
		? [category, subCategory].join(".")
		: (category as string);
	const value = mapping.get(key);
	if (value) {
		const [c, sc] = value.split(".");
		output["category"] = c;
		if (sc) {
			output["subCategory"] = sc;
		}
	}

	return output;
};
// const getOthersCategoryList = (
//   merokuCategoryAPIData: Array<{
//     category: string,
//     subCategory: Array<string>
//   }>
// ): Array<string> => {
//   var merokuCategoryList: string[] = [];
//   merokuCategoryAPIData.map((e) => merokuCategoryList.push(e.category));
//   var othersList: string[] = merokuCategoryList.filter(
//     (value) => !polygonMappedList.includes(value.toLowerCase())
//   );
//   return othersList;
// };

export { polygonMappedList, customToMerokuCategory };
