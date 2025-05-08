
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Header() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-blueprint-primary text-white font-bold">
            A
          </div>
          <h1 className="text-xl font-bold text-blueprint-primary">The Architect</h1>
        </div>
        <div className="flex items-center gap-4">
          {mounted && (
            <Button variant="outline" size="sm">Documentation</Button>
          )}
        </div>
      </div>
    </header>
  );
}
