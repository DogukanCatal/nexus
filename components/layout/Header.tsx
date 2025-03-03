import { Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = () => {
  return (
    <header className="bg-transparent sticky z-50 top-0 backdrop-blur-md shadow-sm  border-b px-4 sm:px-8 md:px-14 mx-auto">
      {/* <div className=" flex justify-between items-center">
        <HeaderSearchBar />
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50}
            height={50}
            className="h-auto w-auto max-h-16 sm:max-h-14 md:max-h-12 lg:max-h-16"
            priority
          />
        </Link>
        <div className="">
          <ShoppingCart className="" />
        </div>
      </div> */}
      <div className=" grid grid-cols-5">
        <div className="col-span-2 place-content-center place-items-start">
          <div className="flex gap-2">
            {/* todo open these for responsive design */}
            {/* <Menu className="md:hidden" />
            <Search className="md:hidden" /> */}
            <Link href={"/"} className="font-semibold">
              Home
            </Link>
          </div>
        </div>
        <Link href={"/"} className="col-start-3 place-items-center">
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50}
            height={50}
            className="h-auto w-auto max-h-16 sm:max-h-14 md:max-h-12 lg:max-h-16"
            priority
          />
        </Link>
        <div className="col-span-2 col-start-4 place-items-end place-content-center">
          <div className="flex items-center justify-center gap-4">
            {/* todo change below div with other div for responsive design */}
            {/* <div className="hidden md:block"> */}
            <div>
              <HeaderSearchBar />
            </div>

            <ShoppingCart className="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
