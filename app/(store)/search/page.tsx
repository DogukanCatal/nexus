import HeaderSearchBar from "@/components/layout/HeaderSearchBar";
import SortDrawer from "@/components/layout/SortDrawer";
import ProductGrid from "@/components/product/ProductGrid";
import { searchProduct } from "@/sanity/lib/products/searchProduct";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string; sort?: string; page?: string }>;
}) => {
  const { query, sort, page } = await searchParams;
  console.log(query, sort);
  const products = await searchProduct(query);

  if (!products || products.length <= 0) {
    return null;
  }

  return (
    <div className="p-4 sm:p-8 md:p-14 mx-auto">
      <div className=" mb-10 flex gap-4 flex-col items-center justify-center">
        <span className="font-bold text-2xl md:text-3xl">
          {products.length} results for "{query}"
        </span>
        {/* todo open search if needed talk with customer */}
        {/* <div className="max-w-screen-md w-full px-2">
          <HeaderSearchBar />
        </div> */}
        <div className="w-full flex items-center justify-end">
          <SortDrawer />
        </div>
        <Link href={`?query=black&sort=merhaba`}>DENEME</Link>
      </div>
      <ProductGrid products={products} />
    </div>
  );
};

export default SearchPage;
