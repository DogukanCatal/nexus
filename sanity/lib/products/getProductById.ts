import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductById = async (id: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
        *[_type == "product" && _id == $id][0] 
        `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: { id },
    });

    return product.data || null;
  } catch (error) {
    console.log("Error fetching product by id", error);

    return null;
  }
};
