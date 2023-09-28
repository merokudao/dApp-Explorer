import { NextApiResponse } from "next";
import { categories } from '../features/dapp/custom_categories'

const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
  const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || "http://localhost:3000";

  const response = await fetch('https://api.meroku.store/api/v1/dapp/search?limit=50');
  const dappData = await response?.json();
  const allDapp = dappData?.data
  console.log(categories)
  const category = categories.data
  

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
       <loc>${baseUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
     </url>
     <url>
       <loc>${baseUrl}/history</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
     </url>
      ${allDapp
        .map((item) => {
          return `
          <url>
              <loc>${baseUrl}/dapp?id=${item?.dappId}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
        ${category
          .map((item) => {
            const categoryStr = `<url>
            <loc>${baseUrl}/categories?categories=${item?.category}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
          </url>
          `;
          let subCategoryStr = ''
          item?.subCategory.length > 0 && item?.subCategory.forEach(e => {
            subCategoryStr = subCategoryStr + `
            <url>
              <loc>${baseUrl}/categories?categories=${item?.category}&amp;subCategory=${e}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>`;
          });
            return categoryStr+subCategoryStr
          })
          .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
