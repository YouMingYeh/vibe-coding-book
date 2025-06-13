"use client";

import { Megaphone } from "lucide-react";

export default function ExampleAlert() {
  return (
    <div className="my-8 p-6 bg-muted/20 rounded-lg">
      <div className="flex items-start gap-4">
        <Megaphone className="h-5 w-5 mt-1 flex-shrink-0 text-muted-foreground" />
        <div className="text-sm leading-relaxed text-muted-foreground">
          This is a clean, minimal alert component that matches the AI 2027 aesthetic. 
          Notice the subtle background, generous spacing, and focus on readability over decoration.
        </div>
      </div>
    </div>
  );
} 