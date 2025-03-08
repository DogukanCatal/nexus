"use client";
import { ProductCategory } from "@/sanity.types";
import React, { useCallback, useEffect, useState } from "react";
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
import CategorySelector from "../ui/categorySelector";

type CategoryDrawerProps = {
  categories: ProductCategory[];
};

const HeaderCategory = ({ categories }: CategoryDrawerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", updateTarget);
    }, []);

    return targetReached;
  };

  const isBreakPoint = useMediaQuery(768);

  return (
    <div>
      {isBreakPoint ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <LayoutGrid />
          </DrawerTrigger>
          <DrawerContent className="bg-[#131313]">
            <DrawerHeader className="border-b-2 border-b-[#454545] shadow-sm">
              <DrawerTitle>Categories</DrawerTitle>
              <DrawerDescription>
                {!categories || categories.length <= 0
                  ? "No Categories Found"
                  : ""}
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
      ) : (
        <CategorySelector categories={categories} />
      )}
    </div>
  );
};

export default HeaderCategory;
