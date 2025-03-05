"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { ShoppingBasketIcon } from "lucide-react";

const Basket = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <ShoppingBasketIcon />
      </SheetTrigger>
      <SheetContent side={"right"} className="bg-[#131313]">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Basket;
