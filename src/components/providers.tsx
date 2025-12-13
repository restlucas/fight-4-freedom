"use client";

import { queryClient } from "@/src/lib/react-query";
import { useAuth } from "@/src/store/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { init, initialized } = useAuth();

  useEffect(() => {
    init();
  }, [init]);

  if (!initialized)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-14 w-14 animate-spin stroke-primary" />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
