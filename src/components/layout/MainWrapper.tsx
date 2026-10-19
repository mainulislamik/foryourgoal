"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/imon");

  return (
    <main
      id="main-content"
      className={isAdmin ? "flex-1 w-full min-h-screen p-0 m-0" : "flex-1 pt-20"}
    >
      {children}
    </main>
  );
}
