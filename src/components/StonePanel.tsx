import React from "react";

interface StonePanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function StonePanel({
  children,
  className = "",
  title,
}: StonePanelProps) {
  return (
    <div className={`osrs-panel shadow-2xl relative ${className}`}>
      {title && (
        <div className="absolute -top-3 left-6 z-20">
          <div className="bg-[#1a1510] border border-[#ff981f]/40 px-3 py-0.5 shadow-lg">
            <h3 className="text-[#ff981f] text-xs font-bold uppercase tracking-[0.1em] osrs-text-shadow-sm whitespace-nowrap">
              {title}
            </h3>
          </div>
        </div>
      )}
      <div className="relative z-10 p-5 h-full">{children}</div>
    </div>
  );
}
