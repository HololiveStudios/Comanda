// ui/select.tsx
import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // Supondo que você tenha utilitários de classe

const SelectContext = React.createContext<{
  open: boolean;
  value: string;
  onValueChange: (value: string) => void;
}>({
  open: false,
  value: '',
  onValueChange: () => {},
});

const Select = React.forwardRef<
  HTMLDivElement,
  {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
  }
>(({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const [open, setOpen] = React.useState(false);

  const handleValueChange = (newValue: string) => {
    onValueChange?.(newValue);
    setInternalValue(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        value: value !== undefined ? value : internalValue,
        onValueChange: handleValueChange,
      }}
    >
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
});

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    placeholder?: string;
  }
>(({ className, placeholder, ...props }, ref) => {
  const { open, value } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      role="combobox"
      aria-expanded={open}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span className="truncate">{value || placeholder}</span>
      <ChevronDown className={cn('h-4 w-4 opacity-50 transition-transform', open && 'rotate-180')} />
    </button>
  );
});

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open } = React.useContext(SelectContext);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 w-full min-w-[8rem] mt-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...props}
    />
  );
});

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext);

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={value === selectedValue}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {value === selectedValue && (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </span>
      {children}
    </div>
  );
});

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);

  return (
    <span
      ref={ref}
      className={cn('truncate', className)}
      {...props}
    >
      {value}
    </span>
  );
});

// Exportar componentes individuais
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};