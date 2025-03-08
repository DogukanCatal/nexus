"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Form from "next/form";

const HeaderSearch = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [value, setValue] = useState<string>("");

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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex">
            <Search />
          </SheetTrigger>
          <SheetContent side={"top"} className="bg-[#131313]">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
              <SheetClose>{""}</SheetClose>
            </SheetHeader>
            <div className=" flex items-center justify-start gap-2 bg-[#262626] p-2 rounded-full shadow-sm mt-2">
              <Search />
              <input
                type="text"
                name="query"
                placeholder="search"
                autoFocus
                className="placeholder-white/50 focus:outline-none bg-transparent font-semibold w-full"
                onChange={(e) => setValue(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!value.trim()) {
                      return;
                    }
                    router.push(`/search?query=${value}`);
                    setOpen(false);
                  }
                }}
              />
              <button
                onClick={() => {
                  if (!value.trim()) {
                    return;
                  }
                  router.push(`/search?query=${value}`);
                  setOpen(false);
                }}
              >
                <ArrowRight />
              </button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Form action="/search">
          <div className="flex items-center justify-start gap-2 p-2 bg-[#262626] shadow-sm rounded-full">
            <button type="submit">
              <Search className="" />
            </button>
            <input
              type="text"
              name="query"
              placeholder="Search"
              className="placeholder-white/50 focus:outline-none bg-transparent font-semibold w-full"
            />
          </div>
        </Form>
      )}
    </div>
  );
};

export default HeaderSearch;
