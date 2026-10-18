import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-indigo-600 animate-spin" />
      <div className="mt-4 text-xs font-mono text-slate-500 tracking-wider">
        Loading Foryourgoal Studio...
      </div>
    </div>
  );
}
