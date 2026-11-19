import { SidebarNav } from "@/components/sidebar-nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="sticky top-16 hidden h-fit max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain p-6 pl-3 lg:block">
        <SidebarNav />
      </aside>
      <main id="content" className="min-w-0">
        {children}
      </main>
    </div>
  );
}
