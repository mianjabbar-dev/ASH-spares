"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  brands: string[];
  vehicles: string[];
}

export function ProductFilters({ categories, brands, vehicles }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const createParamHandler = (key: string) => (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push("/products");
    });
  };

  const activeFiltersCount = [
    searchParams.get("category"),
    searchParams.get("brand"),
    searchParams.get("vehicle"),
    searchParams.get("min"),
    searchParams.get("max"),
    searchParams.get("inStock"),
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-[var(--accent)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
          Category
        </label>
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => createParamHandler("category")(e.target.value)}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Brand</label>
        <select
          value={searchParams.get("brand") || ""}
          onChange={(e) => createParamHandler("brand")(e.target.value)}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
          Vehicle
        </label>
        <select
          value={searchParams.get("vehicle") || ""}
          onChange={(e) => createParamHandler("vehicle")(e.target.value)}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        >
          <option value="">All Vehicles</option>
          {vehicles.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={searchParams.get("min") || ""}
            onChange={(e) => createParamHandler("min")(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
          />
          <span className="text-[var(--muted-foreground)]">-</span>
          <input
            type="number"
            placeholder="Max"
            value={searchParams.get("max") || ""}
            onChange={(e) => createParamHandler("max")(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inStock"
          checked={searchParams.get("inStock") === "true"}
          onChange={(e) => createParamHandler("inStock")(e.target.checked ? "true" : "")}
          className="h-4 w-4 rounded border-[var(--border)]"
        />
        <label htmlFor="inStock" className="text-sm">
          In Stock Only
        </label>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Sort</label>
        <select
          value={searchParams.get("sort") || ""}
          onChange={(e) => createParamHandler("sort")(e.target.value)}
          className="w-full rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="featured">Featured</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--card)] text-sm font-medium"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-[var(--accent-foreground)]">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 mt-4 lg:mt-0`}
      >
        <FilterContent />
      </div>
    </>
  );
}
