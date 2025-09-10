
import React from 'react';

const AlfanumrikLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 200 40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="30"
      fontFamily="sans-serif"
      fontSize="32"
      fontWeight="bold"
      fill="url(#logoGradient)"
    >
      ALFANUMRIK
    </text>
  </svg>
);

export default AlfanumrikLogo;
