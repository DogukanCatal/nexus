"use client";
import { ProductCategory } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface CategorySelectorProps {
  categories: ProductCategory[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className=" border-0 w-full max-w-full flex justify-center items-center hover:text-white text-sm font-semibold "
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="bg-[#2e2d2d]">
          <CommandInput
            placeholder="Search category..."
            className="h-9 font-semibold"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug?.current) {
                  setValue(selectedCategory._id);
                  router.push(`/categories/${selectedCategory.slug.current}`);
                  setOpen(false);
                }
              }
            }}
          />
          <div className="max-h-[300px] overflow-y-auto">
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="bg-[#2e2d2d]">
                {categories.map((category) => (
                  <CommandItem
                    key={category._id}
                    value={category.title}
                    onSelect={() => {
                      setValue(value === category._id ? "" : category._id);
                      router.push(`/categories/${category.slug?.current}`);
                      setOpen(false);
                    }}
                    className="cursor-pointer font-semibold"
                  >
                    {category.title}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === category._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategorySelector;
