"use client";
import { ProductCategory } from "@/sanity.types";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

type CategoryDrawerProps = {
  categories: ProductCategory[];
};

const CategoryDrawer = ({ categories }: CategoryDrawerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <LayoutGrid />
      </DrawerTrigger>
      <DrawerContent className="bg-[#131313]">
        <DrawerHeader className="border-b-2 border-b-[#454545] shadow-sm">
          <DrawerTitle>Categories</DrawerTitle>
          <DrawerDescription>
            {!categories || categories.length <= 0 ? "No Categories Found" : ""}
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-full max-h-[400px] p-4 overflow-y-auto">
          {categories &&
            categories.map((category) => (
              <div
                key={category._id}
                className="p-2 font-bold"
                onClick={() => {
                  router.push(`/categories/${category.slug?.current}`);
                  setOpen(false);
                }}
              >
                {category.title}
              </div>
            ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
