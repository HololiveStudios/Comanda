// components/ui/tabs.tsx
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: '',
  setValue: () => {},
});

export const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, defaultValue, value: propValue, onValueChange, ...props }, ref) => {
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const value = propValue !== undefined ? propValue : localValue;

  const handleValueChange = (newValue: string) => {
    if (propValue === undefined) {
      setLocalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, setValue: handleValueChange }}>
      <div ref={ref} className={cn('w-full', className)} {...props} />
    </TabsContext.Provider>
  );
});
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    role="tablist"
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const { value: contextValue, setValue } = React.useContext(TabsContext);

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        contextValue === value
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:bg-background/50 hover:text-foreground',
        className
      )}
      role="tab"
      aria-selected={contextValue === value}
      aria-controls={`tab-content-${value}`}
      onClick={() => setValue(value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setValue(value);
        }
      }}
      tabIndex={contextValue === value ? 0 : -1}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { value: contextValue } = React.useContext(TabsContext);

  return (
    <AnimatePresence mode="wait">
      {contextValue === value && (
        <motion.div
          ref={ref}
          id={`tab-content-${value}`}
          role="tabpanel"
          aria-labelledby={`tab-trigger-${value}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
TabsContent.displayName = 'TabsContent';