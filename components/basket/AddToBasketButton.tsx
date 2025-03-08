"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Product } from "@/sanity.types";
import { useBasketStore } from "@/store";
import { useShallow } from "zustand/shallow";
type AddToBasketButtonProps = {
  product: Product;
  isOutOfStock: boolean;
};

const AddToBasketButton = ({
  product,
  isOutOfStock,
}: AddToBasketButtonProps) => {
  const { addItem } = useBasketStore(
    useShallow((state) => ({
      addItem: state.addItem,
    }))
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToBasket = async () => {
    if (!product) return;

    setIsLoading(true);
    addItem(product);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsLoading(false);
  };

  return (
    <>
      {isOutOfStock ? (
        <>
          <div className="cursor-not-allowed flex items-center justify-center bg-[#262626] p-4 rounded-md">
            <span className="font-bold text-sm">Out Of Stock</span>
          </div>
        </>
      ) : (
        <Button
          disabled={isLoading}
          className={`font-bold ${isLoading && "cursor-not-allowed"}`}
          onClick={handleAddToBasket}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToBasketButton;
