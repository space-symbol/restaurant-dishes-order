import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";

type Size = "small" | "medium";
type Variant = "outlined" | "filled" | "standard";
type Color = "primary" | "secondary" | "error" | "info" | "success" | "warning"

const input = cva("rounded-md outline-none focus:outline-none", {
  variants: {
    size: {
      small: "text-sm p-2",
      medium: "text-base p-3",
    },
    variant: {
      outlined: "border border-gray-300",
      filled: "bg-gray-100",
      standard: "",
    },
    color: {
      primary: "border-primary",
      secondary: "border-secondary",
      error: "border-error",
      info: "border-info",
      success: "border-success",
      warning: "border-warning",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      color: "primary",
      class: "border-primary",
    },
    {
      variant: "outlined",
      color: "secondary",
      class: "border-secondary",
    },
    {
      variant: "outlined",
      color: "error",
      class: "border-error",
    },
    {
      variant: "outlined",
      color: "info",
      class: "border-info",
    },
    {
      variant: "outlined",
      color: "warning",
      class: "border-warning",
    },
    {
      variant: "filled",
      color: "primary",
      class: "bg-primary",
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "outlined",
    color: "primary",
  },
});

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  color?: Color;
  size?: Size;
  variant?: Variant;
  error?: string;
  name: string;
  startIcon?: React.ReactNode;
  showPassword?: boolean;
  onEyeClick?: () => void;
}

export const Input = (props: InputProps) => {
  const {label, error, className, id, name, variant, color, size, startIcon, type, showPassword, onEyeClick, ...otherProps} = props;

  const generatedId = id || name || label ;
  
  const inputClasses = cn(input({
    size: size,
    variant: variant,
    color: color,
    class: {
      "border-error": error,
      "pl-10": startIcon,
      "pr-10": type == 'password'
    },
  }));

  const inputType = type == 'password' ? showPassword ? 'text' : 'password' : type;

  return <div className={cn("flex flex-col gap-1", className)}>
    {label && <label htmlFor={generatedId}>{label}</label>}
    <div className={cn("flex flex-col gap-1", {
      "relative": startIcon || type == 'password'
    })}>
      {startIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{startIcon}</div>}
      <input id={generatedId} type={inputType} {...otherProps} className={inputClasses} />
      {type == 'password' && (showPassword ? <Eye className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={onEyeClick}/> : <EyeOff className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={onEyeClick}/>)}
    </div>
    {error && <span className="text-error text-sm">{error}</span>}
  </div> 
  
}