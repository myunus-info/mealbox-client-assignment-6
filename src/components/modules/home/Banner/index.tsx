import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/core/Container';
import FadeIn from '@/components/animations/FadeIn';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn className="space-y-6" direction="right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Personalized <span className="text-green-500">Meals</span> Delivered To Your Door
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg">
              Connect with local meal providers for customized, healthy dining experiences tailored
              to your preferences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full font-medium">
                Find Meals
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full font-medium">
                Provider Login
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={`https://randomuser.me/api/portraits/men/${i + 30}.jpg`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-medium">4.9/5</span>{' '}
                <span className="text-gray-500 dark:text-gray-400">from over 2,000 reviews</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} direction="left">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auhref=format&fit=crop&w=1170&q=80"
                  alt="Delicious healthy meal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-400 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-400 dark:bg-gray-800 rounded-2xl -z-10"></div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
