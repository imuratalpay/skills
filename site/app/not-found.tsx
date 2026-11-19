import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main id="content" className="mx-auto max-w-[684px] px-5 pt-16 pb-24 lg:pt-[92px]">
      <div>
        <h1 className="text-title">No skill here</h1>
        <p className="my-4">
          That page doesn’t exist. The{" "}
          <Link href="/" className="link">
            overview
          </Link>{" "}
          lists every skill.
        </p>
      </div>
    </main>
  );
}
