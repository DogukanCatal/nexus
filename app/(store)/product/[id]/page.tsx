import ImageCarousel from "@/components/product/ImageCarousel";
import ProductDescription from "@/components/product/ProductDescription";
import ProductPrice from "@/components/product/ProductPrice";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { getProductById } from "@/sanity/lib/products/getProductById";
import Image from "next/image";
import React from "react";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return null;
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 sm:p-8 md:px-14 mx-auto gap-4">
      <ImageCarousel product={product} />
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl sm:text-3xl">{product.name}</h1>
        <ProductPrice
          price={product.price ?? 0}
          sale={product.salePercentage}
          priceSize="large"
          discountSize="medium"
        />
        {/* Quantity */}
        {/* Add to cart */}
        {isOutOfStock ? (
          <>
            <div className="flex items-center justify-center bg-[#262626] p-4 rounded-md">
              <span className="font-bold text-sm">Out Of Stock</span>
            </div>
          </>
        ) : (
          <Button className="font-bold">Add to Cart</Button>
        )}

        {/* Description */}
        <ProductDescription description={product.description} />
      </div>
    </div>
  );
};

export default ProductPage;
