"use client";
import { useBasketStore } from "@/store";
import { useShallow } from "zustand/shallow";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import ProductPrice from "../product/ProductPrice";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

type BasketProductViewProps = {
  setOpen?: () => void;
};

const BasketProductView = ({ setOpen }: BasketProductViewProps) => {
  const {
    items,
    totalItemsCount,
    totalPrice,
    removeItem,
    addItem,
    clearBasket,
  } = useBasketStore(
    useShallow((state) => ({
      items: state.items,
      totalItemsCount: state.totalItemsCount,
      totalPrice: state.totalPrice,
      removeItem: state.removeItem,
      addItem: state.addItem,
      clearBasket: state.clearBasket,
    }))
  );

  if (!items || items.length <= 0) {
    return (
      <div className="size-full flex items-center justify-center">
        <span className="font-bold">Your Basket Is Empty!</span>
      </div>
    );
  }

  return (
    <div className=" flex flex-col h-full container mx-auto">
      <div className="flex items-center justify-center gap-2">
        <span className="font-bold text-xl">Basket</span>
        {totalItemsCount > 0 && (
          <span className=" bg-white text-black rounded-full size-5 flex items-center justify-center font-bold text-xs">
            {totalItemsCount}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {items.length > 0 &&
          items.map((item) => (
            <div
              key={item.product._id}
              className="flex gap-2 mb-4 md:mb-2 items-center justify-start"
            >
              {item.product.image && (
                <div className="size-20  sm:size-40  relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    alt={item.product.name ?? "Product name"}
                    src={urlFor(item.product.image[0]).url()}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0 justify-center gap-2">
                <span className="truncate font-bold text-sm md:text-base">
                  {item.product.name}
                </span>
                <ProductPrice
                  price={item.product.price ?? 0}
                  sale={item.product.salePercentage}
                />
                <div className="flex items-center justify-start gap-4">
                  <Button
                    className="rounded-lg size-fit"
                    onClick={() => removeItem(item.product._id)}
                  >
                    <Minus />
                  </Button>
                  <span className="font-bold text-sm">{item.quantity}</span>
                  <Button
                    className="rounded-lg size-fit"
                    onClick={() => addItem(item.product)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full p-6 border-t-2 space-y-4 ">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => clearBasket()}
        >
          <span className="font-semibold border-b-2 border-red-700 text-red-700">
            Clear Basket
          </span>
        </div>
        <div>
          <span className="font-bold">Total Price: </span>
          <span className="font-bold">{totalPrice.toFixed(2)} TL</span>
        </div>
        <Link href="/checkout" onClick={setOpen}>
          <div className="w-full my-4 bg-white text-black p-2 rounded-lg flex items-center justify-center font-bold">
            Check Out
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BasketProductView;
