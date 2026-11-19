import Link from "next/link";
import type { ReactNode } from "react";
import { CommandBox } from "./copy";

type Action = { href: string; label: string; icon?: ReactNode; external?: boolean };

const BUTTON =
  "flex h-11 items-center justify-center gap-2 rounded-xl bg-surface text-secondary font-ui text-fg-1 shadow-raised transition-[scale] duration-(--duration-quick) ease-out hover:shadow-raised-hover active:scale-(--scale-press-large)";

/** A tray holding an optional command and a row of buttons. */
export function ActionGroup({ commands, actions }: { commands?: string[]; actions: Action[] }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-stage p-1 shadow-well">
      {commands && <CommandBox commands={commands} label="Copy install command" surface="raised" />}
      <div className="grid grid-cols-2 gap-1">
        {actions.map((a) =>
          a.external ? (
            <a key={a.href} href={a.href} className={BUTTON}>
              {a.label}
              {a.icon}
            </a>
          ) : (
            <Link key={a.href} href={a.href} className={BUTTON}>
              {a.label}
              {a.icon}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
