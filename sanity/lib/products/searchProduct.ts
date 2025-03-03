import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProduct = async (searchQuery: string) => {
  const SEARCH_PRODUCT = defineQuery(`
        *[_type == 'product' && (
        name match "*" + $searchQuery + "*" ||
        description match "*" + $searchQuery + "*" ||
        slug.current match "*" + $searchQuery + "*" ||
        productCategory->title match "*" + $searchQuery + "*" ||
        productCategory->slug.current match "*" + $searchQuery + "*"
        )]
        `);

  try {
    const products = await sanityFetch({
      query: SEARCH_PRODUCT,
      params: { searchQuery },
    });

    return products.data ?? [];
  } catch (error) {
    console.log("Error fetching products by searchQuery", error);
    return [];
  }
};
