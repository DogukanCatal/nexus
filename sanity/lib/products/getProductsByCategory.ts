import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  const GET_PRODUCTS_BY_CATEGORY = defineQuery(`
        *[_type == "product" && references(*[_type == "productCategory" && slug.current == $categorySlug]._id)] | order(name asc)
        `);

  try {
    const products = await sanityFetch({
      query: GET_PRODUCTS_BY_CATEGORY,
      params: { categorySlug },
    });

    return products.data ?? [];
  } catch (error) {
    console.log("Error fetching products by category", error);
    return [];
  }
};
