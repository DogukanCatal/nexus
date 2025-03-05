"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [value, setValue] = useState<String>("");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Search />
      </SheetTrigger>
      <SheetContent side={"top"} className="bg-[#131313]">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
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
  );
};

export default SearchSheet;
