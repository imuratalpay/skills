import { CopyButton } from "./copy-button";
import { PromptText } from "./prompt-text";

/**
 * Lines break between words only, so flags like `--claude` stay whole on a phone.
 * A word longer than a phone line (a URL) breaks after its slashes instead.
 */
function Words({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <span key={i}>
      {i > 0 && " "}
      {word.length > 24 ? (
        // A URL breaks after a slash, never inside a segment.
        word.split(/(?<=\/)/).map((part, j) => (
          <span key={j}>
            {j > 0 && <wbr />}
            <span className="whitespace-nowrap">{part}</span>
          </span>
        ))
      ) : (
        <span className="whitespace-nowrap">{word}</span>
      )}
    </span>
  ));
}

/** A copyable shell command. Several commands stack, and Copy takes all of them. */
export function CommandBox({
  commands,
  label = "Copy command",
  prompt = true,
  surface = "code",
}: {
  commands: string[];
  label?: string;
  prompt?: boolean;
  surface?: "code" | "raised";
}) {
  return (
    <div
      className={`flex min-h-11 items-start gap-3 rounded-xl py-1.5 pr-1.5 pl-4 ${surface === "code" ? "bg-stage shadow-well" : "bg-surface shadow-raised"}`}
    >
      <pre className="min-w-0 flex-1 py-[5px] whitespace-normal">
        {commands.map((c) => (
          <code key={c}>
            <span className="flex gap-2.5">
              {prompt && (
                <span aria-hidden className="text-fg-4 select-none before:content-['$']" />
              )}
              <span className="min-w-0">
                <Words text={c} />
              </span>
            </span>
          </code>
        ))}
      </pre>
      <CopyButton text={commands.join("\n")} label={label} />
    </div>
  );
}

/** One line of a prompt with a copy button, as the header of a playground. */
export function PromptBar({ prompt, invoke }: { prompt: string; invoke: string }) {
  return (
    <div className="flex min-h-10 items-center gap-3 pr-0.5 pl-2.5">
      <span className="code-line min-w-0 flex-1 truncate">
        <span aria-hidden className="text-fg-3 select-none">
          ›{" "}
        </span>
        <PromptText prompt={prompt} invoke={invoke} />
      </span>
      <CopyButton text={prompt} label="Copy prompt" />
    </div>
  );
}
