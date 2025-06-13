"use client";

import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  title?: string;
  language?: string;
}

export function CodeBlock({ children, title, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = async () => {
    const code = typeof children === 'string' ? children : '';
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative rounded-lg border bg-muted/50 dark:bg-muted/20">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-2 text-sm">
          <span className="font-medium">{title}</span>
          {language && (
            <span className="text-xs text-muted-foreground uppercase">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 w-8 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <CheckIcon className="h-3 w-3" />
          ) : (
            <CopyIcon className="h-3 w-3" />
          )}
        </Button>
        <pre className="overflow-x-auto p-4 text-sm">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
