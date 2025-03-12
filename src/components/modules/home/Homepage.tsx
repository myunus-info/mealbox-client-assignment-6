'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import Banner from './Banner';
import HowMealBoxWorks from './HowMealBoxWorks';
import FeaturedMeals from './FeaturedMeals';
import ReadyToGetStarted from './ReadyToGetStarted';
import Testimonials from './Testimonials';
import JoinAsMealProvider from './JoinAsMealProvider';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28">
        <Banner />
        <HowMealBoxWorks />
        <FeaturedMeals />
        <ReadyToGetStarted />
        <Testimonials />
        <JoinAsMealProvider />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
