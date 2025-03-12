import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export interface MealProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  provider: {
    name: string;
    rating: number;
  };
  categories: string[];
  dietaryInfo?: string[];
  className?: string;
}

export const MealCard = ({
  title,
  description,
  price,
  image,
  provider,
  categories,
  dietaryInfo = [],
  className,
}: MealProps) => {
  return (
    <div className={cn('glass-card hover-lift overflow-hidden group', className)}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          width={500}
          height={500}
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {provider && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">{provider.name}</span>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 text-yellow-400 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-xs">{provider.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg leading-tight line-clamp-1">{title}</h3>
          <span className="font-medium text-primary ml-2 whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {categories.slice(0, 2).map(category => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {dietaryInfo.slice(0, 2).map(info => (
            <Badge key={info} variant="outline" className="text-xs">
              {info}
            </Badge>
          ))}
          {(categories.length > 2 || dietaryInfo.length > 2) && (
            <Badge variant="outline" className="text-xs">
              +{categories.length - 2 + (dietaryInfo.length - 2)}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button variant="ghost" size="sm">
            Details
          </Button>
          <Button>Order</Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
