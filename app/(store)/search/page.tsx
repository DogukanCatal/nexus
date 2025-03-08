import ProductGrid from "@/components/product/ProductGrid";
import Sort from "@/components/product/Sort";
import { searchProduct } from "@/sanity/lib/products/searchProduct";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { query = " ", sort = "" } = await searchParams;
  console.log(query);
  const products = await searchProduct(Array.isArray(query) ? query[0] : query);

  if (!products || products.length <= 0) {
    return null;
  }

  const sortProducts = () => {
    switch (sort) {
      case "relevance":
        return products;
      case "price-ascending":
        return products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-descending":
        return products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts();

  return (
    <div className="p-4 sm:p-8 md:p-14 mx-auto">
      <div className=" mb-10 flex gap-4 flex-col items-center justify-center">
        <span className="font-bold text-2xl md:text-3xl">
          {sortedProducts.length} results for &quot;{query}&quot;
        </span>
        {/* todo open search if needed talk with customer */}
        {/* <div className="max-w-screen-md w-full px-2">
          <HeaderSearchBar />
        </div> */}
        <div className="w-full flex items-center justify-end">
          <Sort query={Array.isArray(query) ? query[0] : query} />
        </div>
      </div>
      <ProductGrid products={sortedProducts} />
    </div>
  );
};

export default SearchPage;
