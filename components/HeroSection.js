"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePostHog } from 'posthog-js/react';

// Import InteractiveGrid with client-side rendering only
const InteractiveGrid = dynamic(() => import("@/components/InteractiveGrid"), { ssr: false });

const HeroSection = () => {
  const posthog = usePostHog();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark z-0"></div>
      
      {/* Interactive grid pattern */}
      <InteractiveGrid />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-primary-light dark:text-primary-dark">Synthetic</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark">
            Intelligence
          </span>{" "}
          <span className="block mt-2">Community</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
          Join a vibrant community of AI enthusiasts, researchers, and innovators building 
          the future of synthetic intelligence together.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://t.me/sgyouthai"
            onClick={() => posthog?.capture('hero_cta_clicked', { 
              button_text: 'Join Our Community',
              destination: 'telegram'
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg px-6 py-3 text-white font-medium text-lg overflow-hidden group"
          >
            <span className="relative z-10">Join the Community</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            href="#about"
            className="rounded-lg px-6 py-3 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10 transition-all transform hover:scale-105 font-medium text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-secondary-light/20 dark:bg-secondary-dark/20 blur-3xl"></div>
    </section>
  );
};

export default HeroSection; 