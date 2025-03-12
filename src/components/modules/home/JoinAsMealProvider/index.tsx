'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function JoinAsMealProvider() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80"
                  alt="Chef preparing food"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-2xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-2xl -z-10"></div>
            </div>
          </FadeIn>

          <FadeIn className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Join as a <span className="text-green-500">Meal Provider</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Expand your business and connect with customers looking for quality meals that match
              their dietary preferences and needs.
            </p>
            <ul className="space-y-4">
              {[
                'Showcase your culinary expertise',
                'Create flexible meal offerings',
                'Manage your own schedule and availability',
                'Build a loyal customer base',
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center mt-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button size="lg" className="rounded-full font-medium">
                Become a Provider
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
