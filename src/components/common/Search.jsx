import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const Search = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(()=>{
    if(debouncedSearchTerm){
      onSearchChange(debouncedSearchTerm)
    }
  },[debouncedSearchTerm, onSearchChange])

  return (
    <div className="relative flex  items-center w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
        <SearchIcon size={20} />
      </div>
      <input
        className="w-full py-2 pl-11 pr-4 bg-white border border-slate-300 text-slate-800 placeholder-slate-400 rounded-full focus:outline-none focus:ring-2 transition-all shadow-sm hover:border-slate-400"
        type="text"
        placeholder="Search by title..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
