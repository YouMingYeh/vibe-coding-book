"use client";

import React from "react";
import { TableOfContents } from "./table-of-contents";
import { ReadingProgress } from "./reading-progress";

/**
 * MDXLayout - Pure layout component for MDX content
 *
 * This component is responsible only for the visual layout structure
 * of MDX pages, including table of contents and reading progress.
 *
 * For MDX component styling (headings, paragraphs, etc.),
 * see ./mdx-components.tsx
 */
interface MDXLayoutProps {
  children: React.ReactNode;
  showToc?: boolean;
}

export function MDXLayout({ children, showToc = true }: MDXLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
          <main className="prose-container max-w-none">{children}</main>
          {showToc && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </aside>
          )}
          <ReadingProgress />
        </div>
      </div>
    </div>
  );
}
