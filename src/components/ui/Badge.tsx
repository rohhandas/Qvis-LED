import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-muted text-muted-foreground',
    outline: 'text-foreground border border-border',
    destructive: 'bg-destructive text-destructive-foreground',
    success: 'bg-primary text-primary-foreground',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
