"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductPrice from "./ProductPrice";

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
  const isOutOfStock = product.stock != null && product.stock <= 0;

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
              isHovered && product.image[1]
                ? urlFor(product.image[1]).url()
                : urlFor(product.image[0]).url()
            }
            loading="lazy"
            className="object-cover"
          />
        )}
        {isOutOfStock && (
          <div className="relative aspect-square flex items-center justify-center size-full bg-black/50">
            <div className="p-2 flex items-center justify-center ">
              <span className="font-bold text-xs">Out Of Stock</span>
            </div>
          </div>
        )}
      </Link>

      <div className="flex flex-col w-full p-4 bg-[#262626] gap-1">
        <Link
          href={`/product/${product._id}`}
          className="font-bold text-sm truncate"
        >
          {product.name}
        </Link>
        <ProductPrice price={product.price} sale={product.salePercentage} />
        {/* todo use this or remove */}
        {/* {product.salePercentage && product.salePercentage > 0 ? (
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
        )} */}
      </div>
    </div>
  );
};

export default ProductItem;
