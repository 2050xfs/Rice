import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:bg-indigo-500 hover:scale-105", // primary-styles
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline: // secondary-styles (modified)
          "bg-background text-primary shadow-md border border-indigo-200 hover:bg-indigo-50 hover:scale-105",
        secondary: // shadcn secondary, less used in this project's direct specs
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        transparent: // transparent-styles
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-sm hover:bg-white/20 hover:scale-105",
      },
      size: {
        default: "h-10 px-5 py-3", // Adjusted default to match px-5 py-3
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6 py-4", // Adjusted large to match px-6 py-4
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  hasShimmer?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, hasShimmer = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const showShimmer = hasShimmer && (variant === "outline" || variant === "transparent" || variant === "secondary");

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {showShimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-linear"></div>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
