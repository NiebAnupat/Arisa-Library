import * as React from "react"

import { cn } from "@/lib/utils"

import { Input } from "./input"
import { EyeOff, Eye } from "lucide-react"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <Input
        type={showPassword ? "text" : "password"}
        passSuffix={showPassword ? (
          <Eye
            size={18}
            className="select-none"
            onClick={() => setShowPassword(false)} />
        ) : (
          <EyeOff
            size={18}
            className="select-none"
            onClick={() => setShowPassword(true)} />
        )}
        className={className}
        {...props}
        ref={ref} />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
