'use client';

import React from 'react';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';
import { Utensils, Calendar, Clock } from 'lucide-react';

export default function HowMealBoxWorks() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How MealBox Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Simplifying healthy eating with personalized options
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn delay={100} className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Utensils className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Browse Meals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore meals from local providers that match your dietary preferences and tastes.
            </p>
          </FadeIn>

          <FadeIn delay={200} className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Schedule Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pick your preferred meal times and delivery schedule for maximum convenience.
            </p>
          </FadeIn>

          <FadeIn delay={300} className="glass-card p-6 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enjoy Fresh Meals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Receive freshly prepared meals directly to your door, ready to enjoy.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
