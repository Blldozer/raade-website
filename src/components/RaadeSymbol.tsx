// components/RaadeSymbol.tsx
import React from 'react';

interface RaadeSymbolProps {
  className?: string;
  width?: number;
  height?: number;
}

const RaadeSymbol = ({ className = '', width = 200, height = 200 }: RaadeSymbolProps) => {
  return (
    <img
      src="/raade-symbol.svg"  // Make sure this file is in your public folder
      alt="RAADE Symbol"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default RaadeSymbol;