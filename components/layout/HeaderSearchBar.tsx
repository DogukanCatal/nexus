import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
const HeaderSearchBar = () => {
  return (
    // <Form action="/search" >

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
  );
};

export default HeaderSearchBar;
