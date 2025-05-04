import { NavLink } from "react-router";
import cn from "../lib/cn";
import { cva, VariantProps } from "class-variance-authority";


const link = cva("inline-block select-none", {
  variants: {
    variant: {
      default: "",
      primary: "text-primary hover:text-primary/90",
      secondary: "text-secondary hover:text-secondary/90",
      button: "text-nowrap text-primary-foreground bg-primary px-6 py-2 hover:text-primary-foreground/90 rounded",
      underline: "px-2 py-1 relative text-restaurant-dark after:content-[''] after:block after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-restaurant-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    underline: {
      true: "underline",
      false: "",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      underline: false,
      disabled: false,
    }
  }
})

interface LinkProps extends React.ComponentProps<typeof NavLink>, VariantProps<typeof link> {}

export const Link = (props: LinkProps) => {
  const { className, children, variant, size, disabled, ...otherProps } = props;
  
  const linkClassNames = cn(link({ variant, size, className, disabled }));

  return (
    <NavLink className={linkClassNames} {...otherProps}>
      {children}
    </NavLink>
  );
};