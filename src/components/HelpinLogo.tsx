import React from 'react';

interface HelpinLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'watermark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

export const HelpinLogo: React.FC<HelpinLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  opacity = 1,
}) => {
  const heightClass = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-11',
    xl: 'h-16',
  }[size];

  // 1. Mark only (Icon with 'h' and orange dot)
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 88 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClass} w-auto flex-shrink-0 ${className}`}
        style={{ opacity }}
        aria-label="Helpin Mark"
      >
        <defs>
          <linearGradient id="hMarkStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a8ff" />
            <stop offset="50%" stopColor="#0077e6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="hMarkArchGrad" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="40%" stopColor="#0088ff" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="hMarkDotGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>

        {/* Orange Head / Sun Dot */}
        <circle cx="56" cy="22" r="14" fill="url(#hMarkDotGrad)" />

        {/* Left Vertical Pillar */}
        <rect x="6" y="10" width="18" height="74" rx="9" fill="url(#hMarkStemGrad)" />

        {/* Right Arch & Leg */}
        <path
          d="M15 42 C24 35 44 35 54 44 C61 50 64 59 64 70 L64 75 C64 80 59.5 84 54.5 84 C49.5 84 45 80 45 75 L45 66 C45 58 40 53 33 53 C27 53 22 57 16 62 Z"
          fill="url(#hMarkArchGrad)"
        />
        <rect x="46" y="58" width="18" height="26" rx="9" fill="url(#hMarkArchGrad)" />
      </svg>
    );
  }

  // 2. Watermark variant (Blends smoothly into backdrops)
  if (variant === 'watermark') {
    return (
      <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 340 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ opacity }}
        >
          <defs>
            <linearGradient id="wmHGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a8ff" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="wmDotGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          {/* Orange Dot */}
          <circle cx="62" cy="24" r="14" fill="url(#wmDotGrad)" />

          {/* Left Pillar */}
          <rect x="14" y="12" width="19" height="74" rx="9.5" fill="url(#wmHGrad)" />

          {/* Arch */}
          <path
            d="M24 44 C33 37 53 37 62 46 C69 52 72 61 72 72 L72 76 C72 81 67.5 85 62.5 85 C57.5 85 53 81 53 76 L53 67 C53 60 48 55 41 55 C35 55 29 59 24 64 Z"
            fill="url(#wmHGrad)"
          />
          <rect x="53" y="60" width="19" height="26" rx="9.5" fill="url(#wmHGrad)" />

          {/* elp text */}
          <text
            x="86"
            y="85"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="78"
            fontWeight="800"
            fill="currentColor"
            letterSpacing="-0.035em"
          >
            elp
          </text>

          {/* in text */}
          <text
            x="224"
            y="85"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="78"
            fontWeight="800"
            fill="#2563eb"
            letterSpacing="-0.035em"
          >
            in
          </text>
        </svg>
      </div>
    );
  }

  // 3. Full Logo (Default - Exact visual match of uploaded transparent logo)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClass} w-auto max-w-full flex-shrink-0`}
        style={{ opacity }}
        aria-label="helpin"
      >
        <defs>
          {/* Blue gradient for stylized 'h' */}
          <linearGradient id="helpinBlueStem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0099ff" />
            <stop offset="45%" stopColor="#0070f3" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="helpinBlueArch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="40%" stopColor="#0084ff" />
            <stop offset="85%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>

          {/* Warm orange sun/head dot */}
          <linearGradient id="helpinOrangeDot" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Translucent overlay circle giving dimensional depth */}
          <linearGradient id="helpinCyanBlend" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 1. Orange Sun Dot above arch */}
        <circle cx="62" cy="24" r="14" fill="url(#helpinOrangeDot)" />

        {/* 2. Stylized 'h' Left Pillar with rounded ends */}
        <rect x="14" y="12" width="19" height="74" rx="9.5" fill="url(#helpinBlueStem)" />

        {/* 3. Arch Body & Right Leg */}
        <path
          d="M24 44 C33 37 53 37 62 46 C69 52 72 61 72 72 L72 76 C72 81 67.5 85 62.5 85 C57.5 85 53 81 53 76 L53 67 C53 60 48 55 41 55 C35 55 29 59 24 64 Z"
          fill="url(#helpinBlueArch)"
        />
        <rect x="53" y="60" width="19" height="26" rx="9.5" fill="url(#helpinBlueArch)" />

        {/* 4. Soft cyan curve blend where arch joins stem */}
        <ellipse cx="25" cy="46" rx="9" ry="8" fill="url(#helpinCyanBlend)" />

        {/* 5. 'elp' rendered in deep midnight navy */}
        <text
          x="86"
          y="85"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontSize="78"
          fontWeight="800"
          fill="#0c1b2e"
          letterSpacing="-0.035em"
        >
          elp
        </text>

        {/* 6. 'in' rendered in vivid royal blue */}
        <text
          x="222"
          y="85"
          fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
          fontSize="78"
          fontWeight="800"
          fill="#1d4ed8"
          letterSpacing="-0.035em"
        >
          in
        </text>
      </svg>
    </div>
  );
};
