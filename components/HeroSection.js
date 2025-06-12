"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePostHog } from 'posthog-js/react';

// Import InteractiveGrid with client-side rendering only
const InteractiveGrid = dynamic(() => import("@/components/InteractiveGrid"), { ssr: false });

export default function HeroSection() {
  const posthog = usePostHog();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-light to-surface-light z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image 
            src="/SYAI_Logo.png" 
            alt="SYAI Logo" 
            width={128} 
            height={128} 
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-light">
          Singapore&apos;s Largest{" "}
          <span className="block animated-gradient-text py-2">
            AI Community
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-text-light/80">
          Join over 300 of the brightest young minds from polytechnics and JCs to shape the future of AI in Singapore.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="#about"
            className="animated-gradient-button rounded-lg px-6 py-3 text-white font-semibold inline-flex items-center"
            onClick={() => posthog.capture('hero_cta_click', { cta_text: 'Explore Our Story' })}
          >
            Explore Our Story
          </Link>
          <Link href="/contact"
            className="rounded-lg px-6 py-3 bg-white text-primary-light font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => posthog.capture('hero_cta_click', { cta_text: 'Get In Touch' })}
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-secondary-light/20 dark:bg-secondary-dark/20 blur-3xl"></div>
    </section>
  );
} 