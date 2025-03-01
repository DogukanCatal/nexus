import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-transparent sticky z-50 top-0 backdrop-blur-md shadow-sm  border-b px-4 sm:px-8 md:px-14 mx-auto">
      <div className=" flex justify-between items-center">
        <div>Search</div>
        <div>
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={50} // Default width
            height={50} // Default height
            className="h-auto w-auto max-h-16 sm:max-h-14 md:max-h-12 lg:max-h-16"
            priority // Ensures logo loads quickly
          />
        </div>
        <div className="">
          <ShoppingCart className="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
