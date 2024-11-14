"use client";

import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const path = usePathname();
  
  const [debouncedQuery] = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!debouncedQuery.length) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      setLoading(true);
      try {
        const files = await getFiles({ types: [], searchText: debouncedQuery });
        setResults(files.documents);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          value={query}
          placeholder="Search files..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 focus-visible:ring-blue-500"
          onFocus={() => {
            if (results.length > 0) setOpen(true);
          }}
        />
      </div>

      {/* Search Results Dropdown */}
      <div
        className={cn(
          "absolute mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg",
          "transition-all duration-200 ease-in-out",
          open
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-2"
        )}
      >
        {open && (
          <ul className="max-h-[400px] overflow-y-auto py-2 search-results-scroll">
            {loading ? (
              <li className="px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="relative h-10 w-10">
                    <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-b-2 border-blue-500"></div>
                    <div className="absolute inset-[6px] h-[28px] w-[28px] rounded-full border-2 border-blue-100"></div>
                    <Loader2 className="absolute inset-0 h-full w-full animate-spin text-blue-500" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium text-gray-900">
                      Searching files...
                    </p>
                    <p className="text-xs text-gray-500">
                      Looking for &quot;{query}&quot;
                    </p>
                  </div>
                </div>
              </li>
            ) : results.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                  className="group cursor-pointer px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0">
                        <Thumbnail
                          type={file.type}
                          extension={file.extension}
                          url={file.url}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {file.type} • {file.extension.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-xs text-gray-400 whitespace-nowrap"
                    />
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-sm font-medium text-gray-900">
                    No files found
                  </p>
                  <p className="text-xs text-gray-500">
                    We couldn&apos;t find any files matching &quot;{query}&quot;
                  </p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
