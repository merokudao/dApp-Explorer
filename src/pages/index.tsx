import { useEffect, useState } from "react";
import { AppList, Button, FeaturedLayout, PageLayout } from "../components";
import { Column } from "../components/layout/flex";
import { fetchApps } from "../fetch/fetchApps";
import { fetchCategories } from "../fetch/fetchCategories";
import { fetchFeatured } from "../fetch/fetchFeatured";
import { AppStrings } from "./constants";

const Index = ({ categoryList, featuredList }) => {
  const [homePageApps, setHomePageApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const buildLoadingItems = (count: number = 10) => {
    const _items: any[] = [];
    for (let i = 0; i < count; i++) {
      _items.push(
        <div key={i} className="shimmer w-full h-[160px] rounded-lg" />
      );
    }
    return _items;
  };

  const fetchDapps = async () => {
    try {
      setLoading(true);
      const homePageApp = await fetchApps();
      setHomePageApps(homePageApp);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log;
    }
  };

  useEffect(() => {
    fetchDapps();
  }, []);

  return (
    <>
      <FeaturedLayout featuredList={featuredList} />
      <PageLayout categoryList={categoryList}>
        <h1 className="text-4xl mb-8 capitalize">{AppStrings.allDapps}</h1>
        <div className="h-[54px] w-full" />
        {loading ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
            {buildLoadingItems()}
          </div>
        ) : (
          <AppList data={homePageApps} />
        )}
        <div className="w-full my-8">
          <Column className="flex items-center w-full gap-y-4">
            <p className="text-md text-center">
              You have seen a lot of apps. How about exploring specific
              categories?
            </p>

            <Button
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Go to top
            </Button>
          </Column>
        </div>
      </PageLayout>
    </>
  );
};

export default Index;

export async function getStaticProps() {
//   const categories = await fetchCategories();
  const featured = await fetchFeatured();

  return {
    props: {
      categoryList: [],
      featuredList: featured,
    },
    revalidate: 86400, // revalidate once every day
  };
}
