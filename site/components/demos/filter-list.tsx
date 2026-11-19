"use client";

import { useId, useState } from "react";

const ITEMS = [
  "Button",
  "Checkbox",
  "Dialog",
  "Dropdown menu",
  "Popover",
  "Select",
  "Slider",
  "Switch",
  "Tabs",
  "Toast",
  "Tooltip",
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

function Match({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-fg-1 underline decoration-fg-5 underline-offset-2">{text.slice(i, i + query.length)}</span>
      {text.slice(i + query.length)}
    </>
  );
}

export function FilterList({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const results = ITEMS.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));
  const active = highlight !== null ? results[highlight] : undefined;

  return (
    <div className="flex h-full flex-col items-center px-4 pt-6 font-sans">
      <form
        role="search"
        aria-label="Filter components"
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-[340px] overflow-hidden rounded-xl bg-surface shadow-raised focus-within:shadow-[0_0_0_1px_var(--fg-3),0_0_0_4px_var(--tint)]">
        <label className="flex h-11 items-center gap-2.5 border-b border-line px-3.5">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden className="flex-none text-fg-3">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Filter components</span>
          <input
            data-ghost-id="filter-input"
            role="combobox"
            aria-expanded
            aria-controls={`${id}-list`}
            aria-activedescendant={active ? `${id}-${slug(active)}` : undefined}
            autoComplete="off"
            spellCheck={false}
            value={query}
            placeholder="Filter components…"
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(null);
            }}
            onKeyDown={(e) => {
              const last = results.length - 1;
              if (e.key === "ArrowDown") setHighlight((h) => (h === null || h >= last ? 0 : h + 1));
              else if (e.key === "ArrowUp") setHighlight((h) => (h === null || h <= 0 ? last : h - 1));
              else if (e.key === "Enter" && active) setSelected(active);
              else if (e.key === "Escape") setQuery("");
              else return;
              e.preventDefault();
            }}
            className="h-full min-w-0 flex-1 bg-transparent text-fg-1 outline-none placeholder:text-fg-4"
          />
        </label>
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Components"
          className={`${compact ? "h-[136px]" : "h-[168px]"} overflow-y-auto p-1`}
          onPointerLeave={() => setHighlight(null)}
        >
          {results.map((item, i) => (
            <li
              key={item}
              id={`${id}-${slug(item)}`}
              role="option"
              aria-selected={selected === item}
              data-ghost-id={`option-${slug(item)}`}
              data-highlighted={highlight === i || undefined}
              onPointerMove={() => highlight !== i && setHighlight(i)}
              onClick={() => setSelected(item)}
              className="flex h-8 cursor-default items-center justify-between rounded-lg px-2.5 text-[13px] text-fg-2 select-none data-highlighted:bg-tint data-highlighted:text-fg-1"
            >
              <span>
                <Match text={item} query={query.trim()} />
              </span>
              {selected === item && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="m3.5 7.25 2.25 2.25 4.75-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          ))}
          {results.length === 0 && (
            <li className="flex h-8 items-center px-2.5 text-[13px] text-fg-3">Nothing matches “{query.trim()}”.</li>
          )}
        </ul>
      </form>
      <div className="mt-3 h-5 text-[13px] text-fg-3">
        {selected ? (
          <>
            Picked <span className="font-medium text-fg-1">{selected}</span>
          </>
        ) : (
          "Nothing picked yet"
        )}
      </div>
    </div>
  );
}
