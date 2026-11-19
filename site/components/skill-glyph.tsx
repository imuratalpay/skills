/** A small mark per skill, for list rows. Decorative: the row's text names the skill. */
export function SkillGlyph({ slug }: { slug: string }) {
  return (
    <span
      aria-hidden
      className="grid h-7 w-10 flex-none place-items-center rounded-md bg-stage text-fg-2 shadow-well select-none"
    >
      {slug === "ui-diff" && (
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
          <rect x="0.75" y="0.75" width="20.5" height="12.5" rx="2.25" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
          <path d="M11 0.75h8a2.25 2.25 0 0 1 2.25 2.25v8A2.25 2.25 0 0 1 19 13.25h-8Z" fill="currentColor" opacity="0.3" />
          <path d="M11 -1v16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
      {slug === "type-taste" && (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
          <path d="M0.6 13 4.9 1h1.5L10.7 13H9.1L8 9.8H3.3L2.2 13Zm3.2-4.6h3.7L5.65 3.1Z" />
          <path
            d="M14.6 13.2c-1.6 0-2.7-.9-2.7-2.4 0-1.7 1.4-2.4 3.4-2.6l1.6-.2v-.5c0-1-.6-1.5-1.7-1.5-.9 0-1.6.4-1.8 1.1h-1.3c.2-1.4 1.5-2.3 3.2-2.3 2 0 3.1 1 3.1 2.8V13h-1.3v-1.2c-.5.8-1.4 1.4-2.5 1.4Zm.3-1.2c1.2 0 2-.8 2-1.9v-.8l-1.5.2c-1.3.1-2.1.6-2.1 1.4 0 .7.6 1.1 1.6 1.1Z"
            opacity="0.55"
          />
        </svg>
      )}
      {slug === "ghost-record" && (
        <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
          <path
            d="M1.2 1.1v11.2c0 .4.5.6.8.3l2.6-2.6 1.8 4c.1.3.5.4.8.3l1.3-.6c.3-.1.4-.5.3-.8L7 9.1h3.6c.4 0 .6-.5.3-.8L2 .8c-.3-.3-.8-.1-.8.3Z"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
