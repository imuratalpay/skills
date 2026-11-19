"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { NAV } from "@/lib/nav";
import { SKILLS } from "@/lib/skills";
import { SearchIcon } from "./icons";

type Entry = { href: string; title: string; description: string; haystack: string };

const ENTRIES: Entry[] = NAV.flatMap((g) => g.items).map((item) => {
  const skill = SKILLS.find((s) => `/${s.slug}` === item.href);
  const words = skill
    ? [skill.slug, skill.title, skill.summary, ...skill.whatItDoes, ...skill.prompts, ...skill.keywords]
    : [item.title, item.description, "home start skills"];
  return { ...item, haystack: words.join(" ").toLowerCase() };
});

function filter(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return ENTRIES;
  return ENTRIES.filter((e) => terms.every((t) => e.haystack.includes(t)));
}

const noop = () => () => {};
const useIsMac = () =>
  useSyncExternalStore(
    noop,
    () => /mac|iphone|ipad/i.test(navigator.platform),
    () => true,
  );

export function Search() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const id = useId();
  const isMac = useIsMac();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => filter(query), [query]);
  const current = results[Math.min(active, results.length - 1)];

  /** Keyboard opens (⌘K, /) show the dialog at once; a click gets the enter animation. */
  const open = useCallback((fromKeyboard: boolean) => {
    const d = dialog.current;
    if (!d) return;
    setQuery("");
    setActive(0);
    if (fromKeyboard) d.dataset.instant = "";
    else delete d.dataset.instant;
    d.showModal();
    input.current?.focus();
  }, []);
  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = results.length - 1;
    if (e.key === "ArrowDown") setActive((a) => (a >= last ? 0 : a + 1));
    else if (e.key === "ArrowUp") setActive((a) => (a <= 0 ? last : a - 1));
    else return;
    e.preventDefault();
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => open(e.detail === 0)}
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        className="hidden h-8 w-56 items-center gap-2 rounded-lg bg-transparent px-2.5 text-meta text-fg-3 shadow-well transition-[background-color,color,scale] duration-(--duration-quick) ease-out hover:bg-tint hover:text-fg-2 focus-visible:shadow-[inset_0_0_0_1px_var(--fg-3)] focus-visible:outline-none active:scale-(--scale-press) motion-reduce:active:scale-100 sm:flex [&_svg]:size-3.5"
      >
        <SearchIcon />
        <span>Search</span>
        <kbd className="ml-auto font-sans text-meta text-fg-3">
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
      </button>
      <button
        type="button"
        onClick={(e) => open(e.detail === 0)}
        aria-label="Search skills"
        className="relative grid size-10 place-items-center rounded-lg text-fg-3 transition-[background-color,color] duration-(--duration-quick) ease-out before:absolute before:-inset-0.5 hover:bg-tint hover:text-fg-1 active:bg-tint sm:hidden"
      >
        <SearchIcon />
      </button>

      <dialog
        ref={dialog}
        aria-label="Search skills"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="search-dialog mx-auto mt-[12dvh] w-[min(560px,calc(100vw-32px))] max-w-none overflow-hidden rounded-2xl bg-surface text-fg-2 shadow-overlay"
      >
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (current) {
              router.push(current.href);
              close();
            }
          }}
        >
          <label className="flex h-12 items-center gap-3 border-b-[length:var(--hairline)] border-line px-4 text-fg-3">
            <SearchIcon />
            <span className="sr-only">Search skills</span>
            <input
              ref={input}
              role="combobox"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-activedescendant={current ? `${id}-${current.href}` : undefined}
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="go"
              data-1p-ignore
              data-lpignore="true"
              value={query}
              placeholder="Search skills"
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              className="search-input h-12 min-w-0 flex-1 border-0 bg-transparent text-fg-1 ring-0 outline-none placeholder:text-fg-4 focus-visible:outline-none"
            />
            <kbd className="font-sans text-meta text-fg-3 pointer-coarse:hidden">Esc</kbd>
            {/* No Escape key on a phone: a thumb-sized way out instead. */}
            <button
              type="button"
              onClick={close}
              className="-mr-2 hidden min-h-11 items-center rounded-md px-2 text-meta text-fg-2 active:bg-tint pointer-coarse:flex"
            >
              Cancel
            </button>
          </label>
        </form>
        <ul id={`${id}-list`} role="listbox" aria-label="Results" className="max-h-[min(400px,60vh)] overflow-y-auto overscroll-contain p-1.5">
          {results.map((r) => (
            <li key={r.href} id={`${id}-${r.href}`} role="option" aria-selected={r === current}>
              <Link
                href={r.href}
                tabIndex={-1}
                onClick={close}
                onPointerMove={() => r !== current && setActive(results.indexOf(r))}
                data-active={r === current || undefined}
                className="control flex flex-col rounded-[10px] px-3 py-2 outline-none hover:bg-tint focus-visible:outline-none active:bg-tint data-active:bg-tint"
              >
                <span className="text-secondary font-ui text-fg-1">{r.title}</span>
                <span className="text-meta text-fg-3">{r.description}</span>
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-secondary text-fg-3">
              No skill matches “{query.trim()}”.
            </li>
          )}
        </ul>
      </dialog>
    </>
  );
}
