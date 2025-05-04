import React from 'react';
import cn from '../lib/cn';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "inline-block select-none px-2 py-1 relative text-restaurant-dark",
          "after:content-[''] after:absolute after:bottom-0 after:left-0",
          "after:w-0 after:h-0.5 after:bg-restaurant-red",
          "after:transition-all after:duration-300",
          "hover:after:w-full",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = 'NavLink'; 