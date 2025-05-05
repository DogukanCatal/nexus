import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllBasketProducts = async (ids: string[]) => {
  console.log(ids, "no of ids");
  const ALL_BASKET_PRODUCTS = defineQuery(`
        *[_type == "product" && _id in $ids]
        `);

  try {
    const basketProducts = await sanityFetch({
      query: ALL_BASKET_PRODUCTS,
      params: { ids },
    });

    return basketProducts.data || [];
  } catch (error) {
    console.log("Error fetching all basket products", error);

    return [];
  }
};
