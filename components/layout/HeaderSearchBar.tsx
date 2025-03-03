import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
const HeaderSearchBar = () => {
  return (
    // <Form action="/search" >
    <Form action="/search">
      <div className=" flex items-center justify-center gap-2 bg-[#262626] p-2 rounded-full shadow-sm">
        <button type="submit">
          <Search className="" />
        </button>
        <input
          type="text"
          name="query"
          placeholder="search"
          className="placeholder-white/50 focus:outline-none bg-transparent font-semibold"
        />
      </div>
    </Form>
  );
};

export default HeaderSearchBar;
