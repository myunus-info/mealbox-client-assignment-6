'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 600,
  className = '',
  direction = 'up',
  distance = 20,
  once = true,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && current) {
            observer.unobserve(current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once]);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return { transform: `translateY(${distance}px)` };
        case 'down':
          return { transform: `translateY(-${distance}px)` };
        case 'left':
          return { transform: `translateX(${distance}px)` };
        case 'right':
          return { transform: `translateX(-${distance}px)` };
        default:
          return {};
      }
    }
    return {};
  };

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        ...getDirectionStyles(),
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
