import { Em, OG_SIZE, ogImage } from "@/lib/og";
import { SITE } from "@/lib/skills";

export const alt = "skills: agent skills for building interfaces with taste, and the install command.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: `By ${SITE.author}`,
    // next/og doesn't wrap mixed inline runs, so the two lines are set by hand.
    title: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Agent skills for building</span>
        <span style={{ display: "flex" }}>
          <span style={{ marginRight: "0.24em" }}>interfaces with</span>
          <Em>taste</Em>
        </span>
      </div>
    ),
    command: "npx skills add imuratalpay/skills",
  });
}
