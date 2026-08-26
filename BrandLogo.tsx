import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showText?: boolean;
  textColor?: string;
  variant?: 'full' | 'icon' | 'badge' | 'stacked';
}

/**
 * Official Sport Tech Türkiye Emblem
 * Faithfully matches the official visual identity with dual concentric arcs:
 * - Outer Orange Arc (semi-circle on left)
 * - Inner Royal Cobalt Blue Arc (~280° loop)
 * - Sharp geometric perpendicular line-caps
 */
export const BrandIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Sport Tech Türkiye Logo"
    >
      {/* Outer Orange / Tangerine Arc (Semi-circle left) */}
      <path
        d="M 50 8 A 42 42 0 0 0 50 92"
        stroke="#F37926"
        strokeWidth="8"
        strokeLinecap="butt"
      />
      {/* Inner Royal Cobalt Blue Arc (~280° loop) */}
      <path
        d="M 82 48 A 32 32 0 1 0 72 72"
        stroke="#0D62D2"
        strokeWidth="8"
        strokeLinecap="butt"
      />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  textColor = "text-slate-900",
  variant = "full"
}) => {
  // Size dimensions with perfected optical balance between icon & typography
  const sizeMap = {
    sm: { icon: "w-8 h-8", textSport: "text-xs", textTurk: "text-[8.5px]", gap: "gap-2" },
    md: { icon: "w-11 h-11", textSport: "text-[15px]", textTurk: "text-[10px]", gap: "gap-2.5" },
    lg: { icon: "w-14 h-14", textSport: "text-lg", textTurk: "text-xs", gap: "gap-3" },
    xl: { icon: "w-16 h-16", textSport: "text-xl", textTurk: "text-sm", gap: "gap-3.5" },
    custom: { icon: "w-full h-full", textSport: "text-sm", textTurk: "text-[9.5px]", gap: "gap-2" }
  };

  const currentSize = sizeMap[size];

  if (variant === 'stacked' || variant === 'badge') {
    // Official Full Stacked Logo as in the official branding (Arcs on left + SPORT / TECH / TÜRKİYE stacked)
    return (
      <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-[#09111E] text-white shadow-md ${className}`}>
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full max-w-[200px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Orange Arc */}
          <path
            d="M 70 24 A 58 58 0 0 0 70 140"
            stroke="#F37926"
            strokeWidth="9.5"
            strokeLinecap="butt"
          />
          {/* Inner Royal Cobalt Blue Arc */}
          <path
            d="M 112 80 A 43 43 0 1 0 100 114"
            stroke="#0D62D2"
            strokeWidth="9.5"
            strokeLinecap="butt"
          />
          {/* Typography matching official typography */}
          <text
            x="118"
            y="76"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="0.02em"
          >
            SPORT
          </text>
          <text
            x="118"
            y="114"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="0.02em"
          >
            TECH
          </text>
          <text
            x="119"
            y="146"
            fill="#FFFFFF"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="300"
            fontSize="22"
            letterSpacing="0.16em"
          >
            TÜRKİYE
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${currentSize.gap} ${className} select-none group`}>
      {/* Icon Graphic */}
      <div className="relative shrink-0 flex items-center justify-center">
        <BrandIcon className={currentSize.icon} />
      </div>

      {/* Text Lockup */}
      {showText && (
        <div className="flex flex-col leading-none justify-center">
          <span className={`font-display font-extrabold tracking-tight ${textColor} ${currentSize.textSport} leading-tight`}>
            SPORT TECH
          </span>
          <span className={`font-display font-normal tracking-[0.22em] text-slate-500 uppercase ${currentSize.textTurk} mt-0.5`}>
            TÜRKİYE
          </span>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;

