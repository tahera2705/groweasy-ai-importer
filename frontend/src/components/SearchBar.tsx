"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-4 transition-all duration-300">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />

        <input
          type="text"
          placeholder="Search by name, email, company..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-gray-200
            dark:border-gray-700
            bg-gray-50
            dark:bg-gray-800
            py-3
            pl-11
            pr-10
            text-gray-900
            dark:text-white
            placeholder:text-gray-400
            dark:placeholder:text-gray-500
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
          "
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        )}

      </div>

    </div>
  );
}