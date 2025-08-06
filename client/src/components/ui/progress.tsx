"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

// Helper function to get dynamic color based on score
const getScoreColor = (value: number, maxValue: number = 100) => {
  const percentage = (value / maxValue) * 100;
  if (percentage >= 80) return 'bg-green-600'; // High score: green
  if (percentage >= 70) return 'bg-green-400'; // Good score: light green
  if (percentage >= 50) return 'bg-yellow-500'; // Medium score: yellow
  if (percentage >= 30) return 'bg-orange-500'; // Low-medium score: orange
  return 'bg-red-500'; // Low score: red
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
