'use client';

import React from 'react';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';
import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <Container>
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from customers and providers who are part of our community
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah J.',
              role: 'Customer',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              content:
                'MealBox has transformed how I eat during busy workweeks. The meals are delicious, and I love being able to customize based on my dietary needs.',
            },
            {
              name: 'Michael T.',
              role: 'Meal Provider',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              content:
                "As a chef, this platform has given me a new way to share my creations. I've built a loyal customer base who appreciate my unique approach to healthy cooking.",
            },
            {
              name: 'Emily R.',
              role: 'Customer',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              content:
                "The variety of meals available is amazing. I've discovered so many local chefs and meal styles that I never would have tried otherwise.",
            },
          ].map((testimonial, index) => (
            <FadeIn key={index} delay={100 * (index + 1)}>
              <div className="glass-card p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <Image
                    width={500}
                    height={500}
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">{testimonial.content}</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
