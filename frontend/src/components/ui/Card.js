import React from 'react';
import { cn } from '../../lib/utils';

const variants = {
  default: 'bg-white shadow-md rounded-lg p-6',
  testimonial: 'bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition-shadow',
  service: 'bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow',
  team: 'bg-white shadow-md rounded-lg p-6 text-center',
  pricing: 'bg-white shadow-lg rounded-xl p-8 border-2 border-gray-100 hover:border-primary-red transition-colors'
};

export default function Card({ 
  children, 
  variant = 'default',
  className,
  ...props 
}) {
  return (
    <div
      className={cn(
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 