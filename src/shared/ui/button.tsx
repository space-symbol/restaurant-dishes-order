import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
 
const button = cva("select-none transition-all cursor-pointer flex items-center justify-center gap-2 flex-nowrap text-nowrap p-2 rounded active:scale-[0.95]", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary",
    },
    size: {
      default: "h-9 sm:h-10 py-2 px-3 sm:px-4 text-sm sm:text-base",
      sm: "h-8 sm:h-9 px-2 sm:px-3 rounded-md text-xs sm:text-sm",
      lg: "h-10 sm:h-11 px-6 sm:px-8 rounded-md text-base sm:text-lg",
      icon: "p-1 aspect-square",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}


export const Button = (props: ButtonProps) => {
  const { className, children, variant, ...otherProps } = props;
  const buttonClasses = cn(button({ variant, className }), className);

  return <button className={cn(buttonClasses)} {...otherProps}>
    {children}
  </button>
}