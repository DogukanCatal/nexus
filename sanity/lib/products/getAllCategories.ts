import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const GET_ALL_CATEGORIES = defineQuery(`
        *[_type == "productCategory"] | order(name asc)
        `);

  try {
    const categories = await sanityFetch({ query: GET_ALL_CATEGORIES });

    return categories.data ?? [];
  } catch (error) {
    console.log("Error fetching all categories", error);
    return [];
  }
};
