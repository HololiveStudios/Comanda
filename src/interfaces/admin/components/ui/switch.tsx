import * as React from 'react';
import { cn } from '@/lib/utils';

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    role="switch"
    aria-checked={checked}
    className={cn(
      'inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      checked ? 'bg-primary' : 'bg-input',
      className
    )}
    onClick={() => onCheckedChange(!checked)}
    {...props}
  >
    <span
      className={cn(
        'h-4 w-4 rounded-full bg-background shadow-lg transition-transform',
        checked ? 'translate-x-6' : 'translate-x-1'
      )}
    />
  </button>
));
Switch.displayName = 'Switch';

export { Switch };