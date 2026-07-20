import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-text-secondary",
        accent: "border-accent/20 bg-accent-muted text-accent",
        success: "border-success/20 bg-success-muted text-success",
        warning: "border-warning/20 bg-warning-muted text-warning",
        error: "border-error/20 bg-error-muted text-error",
        outline: "border-border text-text-secondary",
        "in-production": "border-accent/30 bg-accent-muted text-accent",
        completed: "border-success/30 bg-success-muted text-success",
        failed: "border-error/30 bg-error-muted text-error",
        draft: "border-border bg-card text-text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
