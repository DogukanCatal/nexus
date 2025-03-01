"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  if (!product) {
    return null;
  }

  //   todo out of stock
  if (!product.price || product.price <= 0) {
    return null;
  }
  // todo delete this console
  console.log("WE ARE HERE =====>");
  const saleAmount = product.price * ((product.salePercentage || 100) / 100);

  return (
    <div className="rounded-lg overflow-hidden relative flex flex-col">
      <Link
        className=" size-full overflow-hidden aspect-square relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        href={`/product/${product._id}`}
      >
        {product.image && (
          <Image
            fill
            alt={product.name || "Product Name"}
            src={
              isHovered
                ? urlFor(product.image[1]).url()
                : urlFor(product.image[0]).url()
            }
            loading="lazy"
            className="object-contain"
          />
        )}
      </Link>

      <div className="flex flex-col w-full p-4 bg-[#262626] gap-1">
        <Link
          href={`/product/${product._id}`}
          className="font-bold text-sm truncate"
        >
          {product.name}
        </Link>
        {product.salePercentage && product.salePercentage > 0 ? (
          <div className="flex">
            <span className="font-semibold text-slate-300 text-sm">
              {(product.price - saleAmount).toFixed(2)} TL
            </span>
            <span className="font-semibold text-xs ml-2 text-center items-center justify-center flex line-through text-gray-500">
              {(product.price || 0).toFixed(2)} TL
            </span>
          </div>
        ) : (
          <span className="font-semibold text-sm text-slate-300">
            {(product.price || 0).toFixed(2)} TL
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
