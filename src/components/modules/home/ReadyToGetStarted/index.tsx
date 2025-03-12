'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';

export default function ReadyToGetStarted() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <Container>
        <FadeIn className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join the MealBox community today and enjoy personalized meals delivered to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full">
              Find Meals Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              Login / Sign Up
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
