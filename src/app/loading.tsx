import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-brand-violet/30 border-t-brand-lime animate-spin" />
      <div className="mt-4 text-xs font-mono text-brand-ivory/60 tracking-wider">
        Loading Foryourgoal Studio...
      </div>
    </div>
  );
}
