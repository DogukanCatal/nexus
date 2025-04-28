"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingBasketIcon } from "lucide-react";
import BasketProductView from "./BasketProductView";
import { useBasketStore } from "@/store";
import { useShallow } from "zustand/shallow";

const Basket = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { totalItemsCount } = useBasketStore(
    useShallow((state) => ({
      totalItemsCount: state.totalItemsCount,
    }))
  );

  const changeSetOpen = () => {
    setOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="relative">
          <ShoppingBasketIcon />
          {totalItemsCount > 0 && (
            <span className="absolute bg-white text-black rounded-full -top-2 -right-2 size-5 flex items-center justify-center font-bold text-xs">
              {totalItemsCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="bg-[#131313] rounded-l-xl border-0 px-2"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <BasketProductView setOpen={changeSetOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
