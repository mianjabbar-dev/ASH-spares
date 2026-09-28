"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState, useTransition } from "react";

export function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search spare parts..."
          className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] py-2.5 pl-10 pr-24 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-[72px] top-1/2 -translate-y-1/2 p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-medium rounded bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] disabled:opacity-50 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
