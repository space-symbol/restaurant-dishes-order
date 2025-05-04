import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
 
const button = cva("select-none cursor-pointer flex items-center justify-center gap-2 flex-nowrap text-nowrap p-2 rounded active:scale-[0.95] transition-transform transition-colors", {
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
      default: "h-10 py-2 px-4",
      sm: "h-9 px-2 rounded-md",
      lg: "h-11 px-8 rounded-md",
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