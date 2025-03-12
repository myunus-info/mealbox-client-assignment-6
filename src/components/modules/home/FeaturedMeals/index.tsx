'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';
import MealCard from '@/components/modules/meal/MealCard';

const featuredMeals = [
  {
    id: '1',
    title: 'Mediterranean Bowl',
    description: 'Fresh mixed greens with falafel, hummus, and tahini dressing',
    price: 12.99,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80',
    provider: {
      name: 'Green Garden',
      rating: 4.8,
    },
    categories: ['Mediterranean', 'Vegetarian'],
    dietaryInfo: ['Vegan', 'Gluten-Free'],
  },
  {
    id: '2',
    title: 'Pesto Pasta',
    description: 'Fresh pasta with homemade basil pesto and cherry tomatoes',
    price: 14.99,
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80',
    provider: {
      name: 'Pasta House',
      rating: 4.6,
    },
    categories: ['Italian', 'Pasta'],
    dietaryInfo: ['Vegetarian', 'High Protein', 'Gluten-Free'],
  },
  {
    id: '3',
    title: 'Grilled Salmon',
    description: 'Wild-caught salmon with roasted vegetables and quinoa',
    price: 18.99,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1074&q=80',
    provider: {
      name: 'Ocean Grill',
      rating: 4.9,
    },
    categories: ['Seafood', 'Healthy'],
    dietaryInfo: ['High Protein', 'Gluten-Free'],
  },
];

export default function FeaturedMeals() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Meals</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Discover our most popular meals from top local providers
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Meals
            </Button>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMeals.map((meal, index) => (
            <FadeIn key={meal.id} delay={100 * (index + 1)}>
              <MealCard {...meal} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
