import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const Container = ({
  children,
  className,
  as: Component = 'div',
  size = 'xl',
}: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <Component className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </Component>
  );
};

export default Container;
