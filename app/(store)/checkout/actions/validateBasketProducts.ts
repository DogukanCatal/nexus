"use server";
import { Product } from "@/sanity.types";
import { getAllBasketProducts } from "@/sanity/lib/products/getAllBasketProducts";
import { BasketItem } from "@/store";

const validateBasketProducts = async (products: BasketItem[]) => {
  const ids = products.map((item) => item.product._id);
  const validatedProducts = await getAllBasketProducts(ids);

  return validatedProducts;
};

export default validateBasketProducts;
