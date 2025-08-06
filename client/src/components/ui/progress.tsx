"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Helper function to get dynamic color based on score
const getScoreColor = (value: number, maxValue: number = 100) => {
  const percentage = (value / maxValue) * 100;
  if (percentage >= 80) return 'bg-green-600'; // High score: green (4.0+/5)
  if (percentage >= 50) return 'bg-yellow-500'; // Medium score: yellow (2.5-3.9/5)
  return 'bg-red-500'; // Low score: red (0.0-2.4/5)
};

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  dynamicColor?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, max = 100, dynamicColor = false, ...props }, ref) => {
  const indicatorColor = dynamicColor && value !== undefined 
    ? getScoreColor(value, max) 
    : 'bg-primary';

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
