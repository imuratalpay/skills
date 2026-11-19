/** A prompt in mono, with the skill's command picked out when the prompt starts with it. */
export function PromptText({ prompt, invoke }: { prompt: string; invoke: string }) {
  const lead = prompt.startsWith(invoke + " ") ? invoke : null;
  return (
    <>
      {lead && <span className="font-medium text-fg-1">{lead}</span>}
      <span className="text-fg-2">{lead ? prompt.slice(lead.length) : prompt}</span>
    </>
  );
}
