import ProductGrid from "@/components/product/ProductGrid";
import { searchProduct } from "@/sanity/lib/products/searchProduct";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const products = await searchProduct(query);

  if (!products || products.length <= 0) {
    return null;
  }

  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
};

export default SearchPage;
