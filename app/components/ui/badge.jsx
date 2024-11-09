// components/ui/badge.jsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
      className
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }