"use client";

import React, { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const tocItems: TocItem[] = headings.map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      };
    });
    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80px 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
      <h4 className="text-sm font-medium text-foreground mb-4">Contents</h4>
      <div className="space-y-3">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition-colors hover:text-foreground ${
              activeId === item.id ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}
            style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
