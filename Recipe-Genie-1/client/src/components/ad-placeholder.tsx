import React from "react";

export function AdPlaceholder() {
  return (
    <div className="w-full my-8 p-4 bg-muted/20 border-2 border-dashed border-muted rounded-xl flex flex-col items-center justify-center min-h-[200px] gap-2 text-muted-foreground animate-pulse">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50">Advertisement</span>
      <p className="font-medium text-sm">AdSpace Placeholder</p>
    </div>
  );
}
