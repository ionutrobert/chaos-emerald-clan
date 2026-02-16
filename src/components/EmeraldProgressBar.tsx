import React from "react";

interface EmeraldProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  showText?: boolean;
}

export function EmeraldProgressBar({
  progress,
  className = "",
  showText = false,
}: EmeraldProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full relative ${className}`}>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-xs font-bold text-white text-shadow">
          {Math.round(percentage)}%
        </div>
      )}
      <div className="h-4 w-full bg-[#29221a] border border-[#4a4033] relative overflow-hidden">
        <div
          className="h-full bg-[#38d538] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out"
          style={{ width: `${percentage.toFixed(4)}%` }}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
