"use client";
import { Product, ProductCategory } from "@/sanity.types";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Form from "next/form";

const SortDrawer = () => {
  const items = [
    {
      id: 0,
      label: "Default",
      value: "default",
    },
    {
      id: 1,
      label: "Price: Low to High",
      value: "price-ascending",
    },
    {
      id: 2,
      label: "Price: High to Low",
      value: "price-descending",
    },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="bg-[#262626] p-2 rounded-md flex items-center justify-center gap-2">
          <span className="font-semibold">sort by</span>
          <ChevronDown />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#131313]">
        <DrawerHeader className="border-b-2 border-b-[#454545] shadow-sm">
          <DrawerTitle>Categories</DrawerTitle>
          <DrawerDescription>
            {!items || items.length <= 0 ? "No Categories Found" : ""}
          </DrawerDescription>
        </DrawerHeader>
        {items &&
          items.map((item) => (
            <Form action="/search" key={item.id}>
              <input
                value={item.value}
                readOnly
                name="query"
                className="hidden"
              />
              <button className="p-2 font-bold" type="submit">
                {item.label}
              </button>
            </Form>
          ))}
      </DrawerContent>
    </Drawer>
  );
};

export default SortDrawer;
