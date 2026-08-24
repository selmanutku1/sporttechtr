import React from 'react';

interface SporsepetiIconProps {
  className?: string;
  size?: number;
}

/**
 * Sporsepeti Official Brand Emblem
 * Point-symmetric geometric dual-wing "S" mark with vibrant blue & sunset coral-gold gradients.
 */
export const SporsepetiIcon: React.FC<SporsepetiIconProps> = ({
  className = "w-10 h-10",
  size
}) => {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Sporsepeti Logo"
    >
      <defs>
        {/* Top-Left Sky to Royal Blue Gradient */}
        <linearGradient id={`sp-cyan-${uniqueId}`} x1="28" y1="5" x2="50" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#29B6F6" />
          <stop offset="60%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>

        <linearGradient id={`sp-blue-mid-${uniqueId}`} x1="8" y1="35" x2="42" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#0044DD" />
        </linearGradient>

        <linearGradient id={`sp-blue-dark-${uniqueId}`} x1="15" y1="50" x2="35" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0044DD" />
          <stop offset="100%" stopColor="#002DB3" />
        </linearGradient>

        {/* Bottom-Right Magenta to Coral to Gold Gradients */}
        <linearGradient id={`sp-pink-${uniqueId}`} x1="60" y1="40" x2="90" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D81B60" />
          <stop offset="100%" stopColor="#EC407A" />
        </linearGradient>

        <linearGradient id={`sp-coral-${uniqueId}`} x1="72" y1="45" x2="98" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="60%" stopColor="#FF5722" />
          <stop offset="100%" stopColor="#FF7043" />
        </linearGradient>

        <linearGradient id={`sp-gold-${uniqueId}`} x1="50" y1="75" x2="80" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7043" />
          <stop offset="50%" stopColor="#FFA726" />
          <stop offset="100%" stopColor="#FFCA28" />
        </linearGradient>
      </defs>

      {/* ================= TOP-LEFT BLUE WING ================= */}
      <g id="top-blue-wing">
        {/* Top Azure Petal Cap */}
        <path
          d="M 44 2 C 49 7 51 15 45 21 L 26 40 L 10 24 L 32 3 C 36 -1 40 -1 44 2 Z"
          fill={`url(#sp-cyan-${uniqueId})`}
        />

        {/* Middle Vibrant Royal Blue Facet */}
        <path
          d="M 26 40 L 42 56 L 26 62 C 16 60 10 54 7 46 L 26 40 Z"
          fill={`url(#sp-blue-mid-${uniqueId})`}
        />

        {/* Outer Curved Left Contour */}
        <path
          d="M 44 2 C 50 8 50 17 44 23 L 26 41 L 42 57 C 34 65 22 64 12 54 C 2 44 2 30 14 18 L 32 3 C 36 -1 40 -1 44 2 Z"
          fill={`url(#sp-cyan-${uniqueId})`}
        />

        {/* Bottom Royal Blue Corner Segment */}
        <path
          d="M 26 41 L 42 57 C 34 65 22 64 12 54 C 5 47 4 38 9 29 L 26 41 Z"
          fill={`url(#sp-blue-mid-${uniqueId})`}
        />

        {/* Bottom Dark Navy Accent Corner */}
        <path
          d="M 26 41 L 18 49 C 13 44 11 39 15 28 L 26 41 Z"
          fill={`url(#sp-blue-dark-${uniqueId})`}
          opacity="0.4"
        />
      </g>

      {/* ================= BOTTOM-RIGHT WARM WING ================= */}
      <g id="bottom-warm-wing">
        {/* Top Magenta / Rose Accent */}
        <path
          d="M 58 43 L 74 27 C 82 35 80 47 70 57 L 58 43 Z"
          fill={`url(#sp-pink-${uniqueId})`}
        />

        {/* Main Sweeping Coral / Gold Petal */}
        <path
          d="M 58 43 L 74 27 C 82 35 91 44 93 54 C 95 65 87 76 77 86 C 68 95 57 96 50 89 C 43 82 45 70 53 62 L 70 45 L 58 43 Z"
          fill={`url(#sp-coral-${uniqueId})`}
        />

        {/* Bottom Golden / Amber Curved Tail */}
        <path
          d="M 70 57 L 85 72 C 92 79 86 91 75 94 C 64 97 54 92 49 85 C 44 78 47 67 55 59 L 70 57 Z"
          fill={`url(#sp-gold-${uniqueId})`}
        />

        {/* Bottom Soft Yellow Curve Finishing Tip */}
        <path
          d="M 70 72 L 55 59 L 50 64 C 43 71 44 80 51 87 C 58 94 70 92 78 84 L 85 77 L 70 72 Z"
          fill={`url(#sp-gold-${uniqueId})`}
        />
      </g>
    </svg>
  );
};
