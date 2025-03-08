"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import SortSelector from "../ui/sortSelector";

type Sort = {
  query: string;
  isSearchPage?: boolean;
};

const Sort = ({ query, isSearchPage = true }: Sort) => {
  const items = [
    {
      id: 0,
      label: "Relevance",
      value: "relevance",
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
  const [value, setValue] = useState<number>(0);
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
            {/* <div className="bg-[#262626] p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer">
              <span className="font-semibold">sort by</span>
              <ChevronDown />
            </div> */}

            <div className="flex justify-center items-center hover:text-white text-xs font-semibold gap-1">
              {value
                ? items.find((item) => item.id === value)?.label
                : "Relevance"}
              <ChevronsUpDown className=" h-4 w-4 shrink-0" />
            </div>

            {/* <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className=" border-0 w-full max-w-full flex justify-center items-center hover:text-white text-xs font-semibold "
            >
            
              {items.find((item) => item.id === value)?.label}
              <ChevronsUpDown className=" h-4 w-4 shrink-0" />
            </Button> */}
          </DrawerTrigger>
          <DrawerContent className="bg-[#131313]">
            <DrawerHeader className="border-b-2 border-b-[#454545] shadow-sm">
              <DrawerTitle>Sort By</DrawerTitle>
              <DrawerDescription>
                {!items || items.length <= 0 ? "No Categories Found" : ""}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              {items &&
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 font-bold"
                    onClick={() => {
                      setValue(value === item.id ? 0 : item.id);
                      if (isSearchPage) {
                        router.replace(`?query=${query}&sort=${item.value}`);
                      } else {
                        router.replace(`?sort=${item.value}`);
                      }
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </div>
                ))}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <SortSelector query={query} isSearchPage={isSearchPage} items={items} />
      )}
    </div>
  );
};

export default Sort;
