import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedHeadlineProps {
  className?: string;
}

const AnimatedHeadline = ({ className }: AnimatedHeadlineProps) => {
  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <h1 className="font-bold text-center">
        <span className="block text-4xl md:text-6xl lg:text-7xl text-white opacity-0">
          WE CAN'T WAIT
        </span>
        <span className="block text-4xl md:text-6xl lg:text-7xl text-white opacity-0">
          FOR TOMORROW
        </span>
        <span className="block text-4xl md:text-6xl lg:text-7xl text-white opacity-0">
          WE'RE BUILDING IT TODAY
        </span>
      </h1>
    </div>
  );
};

export default AnimatedHeadline;