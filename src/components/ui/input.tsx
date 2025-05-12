import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[44px] w-full rounded-md border border-input bg-background",
          "px-4 py-2.5 text-base ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground/70", // Increased contrast for placeholder
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "focus:border-primary/50", // Added border color change on focus
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-200", // Smooth transition for focus states
          "md:text-sm",
          // Touch-friendly spacing in forms
          "[&:not(:first-child)]:mt-2",
          // Improved touch target for date inputs
          "[&[type='date']]:min-h-[44px] [&[type='date']]:px-3",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
