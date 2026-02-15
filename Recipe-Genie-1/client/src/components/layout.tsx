import React from "react";
import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-md items-center justify-between px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            <span className="text-3xl">🍳</span> RecipeGenie
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
             {/* Add nav items here if needed later */}
          </nav>
        </div>
      </header>
      <main className="container max-w-screen-md mx-auto px-4 py-8 pb-24">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 text-center text-sm text-muted-foreground bg-muted/30">
        <p>&copy; {new Date().getFullYear()} RecipeGenie. Bon Appétit!</p>
      </footer>
    </div>
  );
}
