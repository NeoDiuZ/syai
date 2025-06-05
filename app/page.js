'use client';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

// Newsletter Subscription Form Component
function NewsletterSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const posthog = usePostHog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    // Track newsletter subscription attempt
    posthog?.capture('newsletter_subscription_attempted', {
      email_domain: email.split('@')[1] || 'unknown'
    });

    if (!email) {
      setMessage('Please enter your email.');
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setMessage(data.message || 'Successfully subscribed!');
      setIsError(false);
      setEmail(''); // Clear input field on success
      
      // Track successful subscription
      posthog?.capture('newsletter_subscription_successful', {
        email_domain: email.split('@')[1] || 'unknown'
      });
    } catch (error) {
      setMessage(error.message || 'Failed to subscribe. Please try again.');
      setIsError(true);
      
      // Track failed subscription
      posthog?.capture('newsletter_subscription_failed', {
        error: error.message,
        email_domain: email.split('@')[1] || 'unknown'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start max-w-md">
      <div className="flex-grow w-full">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="flex-grow w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark outline-none transition-all duration-300 bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
        />
        {message && (
          <p className={`mt-2 text-sm ${isError ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center relative overflow-hidden group animate-gradient-x disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">{loading ? 'Subscribing...' : 'Subscribe'}</span>
        {!loading && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>}
        {!loading && (
            <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform"
            >
                <path d="M3.75 3C3.33579 3 3 3.33579 3 3.75V20.25C3 20.6642 3.33579 21 3.75 21H20.25C20.6642 21 21 20.6642 21 20.25V3.75C21 3.33579 20.6642 3 20.25 3H3.75ZM19.5 4.5V6.9375L12 12.5625L4.5 6.9375V4.5H19.5ZM4.5 19.5V8.5625L12 14.0625L19.5 8.5625V19.5H4.5Z"/>
            </svg>
        )}
      </button>
    </form>
  );
}

// Contact Section Component
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const posthog = usePostHog();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitted(false);
    setIsLoading(true);

    // Track contact form attempt
    posthog?.capture('contact_form_attempted', {
      message_length: formData.message.length,
      email_domain: formData.email.split('@')[1] || 'unknown'
    });

    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit message.');
      }
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Track successful contact form submission
      posthog?.capture('contact_form_successful', {
        message_length: formData.message.length,
        email_domain: formData.email.split('@')[1] || 'unknown'
      });
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsSubmitted(false);
      
      // Track failed contact form submission
      posthog?.capture('contact_form_failed', {
        error: err.message,
        email_domain: formData.email.split('@')[1] || 'unknown'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
            Get In <span className="text-primary-light dark:text-primary-dark">Touch</span>
          </h2>
          <div className="mt-3 h-1.5 w-24 bg-secondary-light dark:bg-secondary-dark mx-auto rounded-full"></div>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-text-light/80 dark:text-text-dark/80">
            Have a question, suggestion, or partnership inquiry? We&apos;d love to hear from you!
          </p>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark p-8 sm:p-10 rounded-2xl shadow-xl border border-primary-light/10 dark:border-primary-dark/10">
          <div className="mb-8 text-center">
            <p className="text-lg mb-2">
              Reach us directly via email:
            </p>
            <a
              href="mailto:hello@sgyouthai.org"
              onClick={() => posthog?.capture('email_link_clicked', { source: 'contact_section' })}
              className="text-xl font-semibold text-primary-light dark:text-primary-dark hover:underline underline-offset-4 transition-all duration-300"
            >
              hello@sgyouthai.org
            </a>
            <p className="mt-6 text-lg">Or, use the form below to send us a message:</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                id="contact-name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark outline-none transition-all duration-300 bg-background-light dark:bg-background-dark"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                id="contact-email"
                value={formData.email}
                disabled={isLoading}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark outline-none transition-all duration-300 bg-background-light dark:bg-background-dark"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                id="contact-message"
                rows="5"
                value={formData.message}
                disabled={isLoading}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark outline-none transition-all duration-300 bg-background-light dark:bg-background-dark"
              ></textarea>
            </div>

            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            {isSubmitted && (
              <p className="text-sm text-green-600 dark:text-green-400">Thank you! Your message has been sent successfully.</p>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg px-8 py-3 bg-gradient-to-r from-primary-light via-purple-500 to-secondary-light dark:from-primary-dark dark:via-purple-600 dark:to-secondary-dark text-white font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center justify-center relative overflow-hidden group animate-gradient-x disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">{isLoading ? 'Sending...' : 'Send Message'}</span>
                {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-primary-light via-purple-500 to-secondary-light dark:from-primary-dark dark:via-purple-600 dark:to-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>}
                {!isLoading && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  // Define images for the AIConnect carousel
  const aiConnectImages = [
    "/gallery/meetup.jpg",
    "/gallery/yac.png",
    "/gallery/syaigathering1.png",
    "/gallery/mindfulhacksxsyai.png",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Our <span className="text-primary-light dark:text-primary-dark">Story</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-4 border border-primary-light/10 dark:border-primary-dark/10 rounded-2xl bg-background-light dark:bg-background-dark">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20"></div>
              <Image
                src="/SYAI_Logo.png"
                alt="SYAI Logo"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
            <div>
              <p className="text-lg text-text-light/90 dark:text-text-dark/90 mb-6">
                Founded in 2023, Singapore Youth AI was created for students by students from Polytechnics and Junior Colleges who share a passion for artificial intelligence. Our organization began as a way to bring together like-minded individuals interested in AI technology and its applications. Today, we&apos;ve flourished into a thriving community of over 300 youth innovators—and we continue to grow!
              </p>
              <p className="text-lg text-text-light/90 dark:text-text-dark/90 mb-8">
                We recognized a critical gap in Singapore&apos;s AI landscape: despite significant interest among young enthusiasts, there was no unified platform to channel this energy. SYAI was established to fill this void, serving as the premier hub for youth interested in AI. We provide a collaborative space where young talents can connect, develop their skills, and transform their aspirations into impactful, Singapore-focused AI initiatives.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Enhanced Hover Effect */}
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-primary-light dark:text-primary-dark text-3xl mb-2">300+</div>
                  <div className="font-medium">Active Members</div>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-secondary-light dark:text-secondary-dark text-3xl mb-2">50+</div>
                  <div className="font-medium">Events Organized</div>
              </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-primary-light dark:text-primary-dark text-3xl mb-2">4</div>
                  <div className="font-medium">Polytechnic Partners</div>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-secondary-light dark:text-secondary-dark text-3xl mb-2">$65K</div>
                  <div className="font-medium">Total Funding Secured</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamps Section */}
      <section id="bootcamps" className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              SYAI <span className="text-primary-light dark:text-primary-dark">Inspire</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Our flagship education program is funded with $14,200 to develop the next generation of AI educators. 
              Through this initiative, we collaborate with AI Singapore to launch comprehensive bootcamps that prepare 
              pre-university students to become AI trainers.
            </p>
          </div>
          
          <div className="mb-12">
            <p className="text-lg max-w-4xl mx-auto text-text-light/80 dark:text-text-dark/80 mb-8">
              These intensive bootcamps cover:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Foundational AI concepts</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Practical AI coding skills</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI knowledge frameworks</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI risk and safety protocols</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Hands-on workshop experience</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Presentation and teaching methodologies</span>
              </div>
            </div>
          </div>

          <p className="text-lg max-w-5xl mx-auto text-text-light/80 dark:text-text-dark/80 mb-8">
            We&apos;ve established partnerships with AI clubs across four polytechnics (Singapore Polytechnic, Ngee Ann Polytechnic, Nanyang Polytechnic, and Republic Polytechnic) to implement a CCA point program for organizing these bootcamps and recruiting volunteers. Participants receive certification upon completion of the two-day bootcamp conducted by industry engineers, with all meals provided. Graduates then volunteer to conduct AI workshops at secondary schools, sharing their knowledge while earning CCA points from their respective polytechnics.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bootcamp cards remain the same */}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="https://forms.gle/cYjQnkqBKeS9vpeo8"
              className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Sign up for SYAI Inspire Bootcamps</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* AIConnect Section */}
      <section id="aiconnect" className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              SYAI <span className="text-primary-light dark:text-primary-dark">Connect</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Our community engagement initiative, developed in collaboration with Cyber Youth Singapore, has secured $50,000 in funding to host monthly AI meetups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              {/* Replace existing Image with ImageCarousel */}
              <ImageCarousel images={aiConnectImages} /> 

              <div className="space-y-6 mt-8"> {/* Added mt-8 for spacing */}
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Expert Presentations</h3>
                    <p className="text-text-light/80 dark:text-text-dark/80">
                      Learn from industry experts and innovators sharing cutting-edge AI developments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Interactive Workshops</h3>
                    <p className="text-text-light/80 dark:text-text-dark/80">
                      Engage in hands-on skill-building sessions to enhance your AI capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Networking Activities</h3>
                    <p className="text-text-light/80 dark:text-text-dark/80">
                      Connect with peers and discover collaboration opportunities in a supportive environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Monthly Events</h3>
              <div className="space-y-4">
                {/* Enhance Card Hovers */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">Fireside Chats</h4>
                      <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                      <p className="text-text-light/80 dark:text-text-dark/80">
                        Intimate discussions with AI practitioners sharing real-world experiences and insights.
                      </p>
                    </div>
                    {/* Use primary color for tag bg */}
                    <span className="bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                      Free
                    </span>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">Project Collaborations</h4>
                      <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                      <p className="text-text-light/80 dark:text-text-dark/80">
                        Team up with fellow enthusiasts to work on innovative AI solutions to real problems.
                      </p>
                    </div>
                    {/* Use secondary color for tag bg */}
                    <span className="bg-secondary-light/10 dark:bg-secondary-dark/10 text-secondary-light dark:text-secondary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                      Members
                    </span>
                  </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">Social Activities</h4>
                      <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                      <p className="text-text-light/80 dark:text-text-dark/80">
                        Build relationships with refreshments and networking in a relaxed setting.
                      </p>
                    </div>
                    {/* Use primary color for tag bg */}
                    <span className="bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                      Free
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                 {/* Enhanced Button Hover */}
                <Link href="https://aisdc.aisingapore.org/" className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x">
                  <span className="relative z-10">Register for this month&apos;s AI Meetup</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AITimes Section */}
      <section id="aitimes" className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              SYAI <span className="text-primary-light dark:text-primary-dark">Times</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Singapore&apos;s premier youth-focused AI news platform, keeping our community informed about developments in the rapidly evolving AI landscape worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Daily Newsletters</h3>
              <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
                Our curated daily newsletters help students track the latest innovations, research breakthroughs, and industry trends in artificial intelligence.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Latest AI research and breakthroughs</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Industry applications and case studies</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Policy and ethical considerations</span>
                </div>
              </div>
              <NewsletterSubscriptionForm />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Singapore AI Events Calendar</h3>
              <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
                We aggregate information about AI events throughout Singapore, creating a centralized calendar for the AI community to ensure ambitious youth never miss valuable opportunities.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Hackathons and competitions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Workshops and learning opportunities</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Conferences and networking events</span>
                </div>
              </div>
              
              <Link href="#" className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x">
                <span className="relative z-10">View AI Events Calendar</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article cards remain the same */}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="#"
              className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">View All Articles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link> 
          </div>
        </div>
      </section>

      {/* Join Committee Section */}
      <section id="join-committee" className="py-20 bg-surface-light dark:bg-surface-dark relative overflow-hidden border-t-4 border-primary-light dark:border-primary-dark">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-light/5 dark:bg-primary-dark/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary-light/10 dark:bg-secondary-dark/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Join the SYAI <span className="text-primary-light dark:text-primary-dark">Committee</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Looking to develop leadership skills and gain valuable experience in the AI community? Join the SYAI Committee and help shape the future of youth AI initiatives in Singapore.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold mb-6">Build Your Portfolio with Real-World Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Organize impactful AI events and workshops</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Collaborate with industry partners and sponsors</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Develop professionally through hands-on project management</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Build a network of connections in the tech industry</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Gain priority access to exclusive SYAI opportunities</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Work alongside passionate peers who share your interests</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Enhance Card Hovers */}
            <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border-2 border-transparent flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Programme Team</h3>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Secure secondary schools for workshop partnerships</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Liaise with AI Singapore for volunteer training</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Plan and execute signature events</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Develop curriculum and workshop content</span>
                </li>
              </ul>
              <Link href="https://forms.gle/VKgYwhSoB9dChtct8" className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x">
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>

            <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border-2 border-transparent flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Social Team</h3>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Manage all SYAI social platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Create comprehensive publicity plans for events</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Design all SYAI visual content and marketing materials</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Build our online community and digital presence</span>
                </li>
              </ul>
              <Link
                href="https://forms.gle/VKgYwhSoB9dChtct8"
                className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>

            <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border-2 border-transparent flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Outreach Team</h3>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Handle corporate communications and partnership inquiries</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Represent SYAI at corporate meetings and networking events</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Develop relationships with potential partners and sponsors</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark mt-1">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm">Coordinate with secondary schools for program implementation</span>
                </li>
              </ul>
              <Link
                href="https://forms.gle/VKgYwhSoB9dChtct8"
                className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          <p className="text-lg max-w-4xl mx-auto text-text-light/80 dark:text-text-dark/80 mt-8 mb-8 text-center">
            Committee members receive mentorship from industry professionals and senior members, gain valuable experience organizing AI-related events, and play a crucial role in building Singapore&apos;s youth AI community. You&apos;ll develop transferable skills that enhance both academic prospects and future career opportunities while connecting with like-minded peers passionate about AI.
          </p>

          <div className="text-center mt-8">
             {/* Enhanced Button Hover */}
            <Link
              href="https://forms.gle/VKgYwhSoB9dChtct8"
              className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Apply to Join the SYAI Committee</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Our <span className="text-primary-light dark:text-primary-dark">Team</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Meet the passionate individuals behind SYAI who are working together to build a community
              of AI enthusiasts and create innovative solutions.
            </p>
          </div>

          {/* Board Members Section */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 animate-fadeInSlideUp">
              Board <span className="text-primary-light dark:text-primary-dark">Members</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 justify-center">
              {/* Raymond Loong Ng */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/raymond.png" 
                    alt="Raymond Loong Ng" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Raymond Loong Ng</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">President</p>
                  <a 
                    href="https://www.linkedin.com/in/raymond-loong-ng" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/zaer.png" 
                    alt="cleveland" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Zaer</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Co-Founder</p>
                  <a 
                    href="https://www.linkedin.com/in/zaerzaqy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Soh Hong Yu */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/hongyu.png" 
                    alt="Soh Hong Yu" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Soh Hong Yu</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Vice President</p>
                  <a 
                    href="https://www.linkedin.com/in/soh-hong-yu-ultraraptor" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/cleveland.jpg" 
                    alt="Cleveland" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Cleveland</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Co-Founder</p>
                  <a 
                    href="https://www.linkedin.com/in/cleverleverland" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Excommittee Section */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 animate-fadeInSlideUp">
              Executive <span className="text-primary-light dark:text-primary-dark">Committee</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 justify-center">
              {/* Raymond Loong Ng */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/raymond.png" 
                    alt="Raymond Loong Ng" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Raymond Loong Ng</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">President</p>
                  <a 
                    href="https://www.linkedin.com/in/raymond-loong-ng" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Soh Hong Yu */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/hongyu.png" 
                    alt="Soh Hong Yu" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Soh Hong Yu</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Vice President</p>
                  <a 
                    href="https://www.linkedin.com/in/soh-hong-yu-ultraraptor" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              
              {/* Soh Tze Aan */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Soh_Tze_Aan.JPG" 
                    alt="Soh Tze Aan" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Soh Tze Aan</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Treasurer</p>
                  <a 
                    href="https://www.linkedin.com/in/tzeaan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Xie Kaiwen */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/kaiwen.png" 
                    alt="Xie Kaiwen" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Xie Kaiwen</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Head of SYAI Inspire</p>
                  <a 
                    href="https://www.linkedin.com/in/kaiwen-xie/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Kaleb Nim */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/kaleb.png" 
                    alt="Kaleb Nim" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Kaleb Nim</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Head of SYAI Monthly Meetups</p>
                  <a 
                    href="https://www.linkedin.com/in/kaleb-nim" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Yovita Singh Jolly */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Yovita_Singh_Jolly.jpg" 
                    alt="Yovita Singh Jolly" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Yovita Singh Jolly</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Secretary</p>
                  <a 
                    href="https://www.linkedin.com/in/yovitasinghjolly" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subcommittee Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 animate-fadeInSlideUp">
              Sub<span className="text-primary-light dark:text-primary-dark">committee</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {/* Ang Zi En Sherlyn */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Sherlyn_Ang.jpg" 
                    alt="Ang Zi En Sherlyn" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Ang Zi En Sherlyn</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="https://www.linkedin.com/in/sherlyn-ang-6b3812315" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Zhu Bolin */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/zhu_Bolin.jpg" 
                    alt="Zhu Bolin" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Zhu Bolin</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="http://linkedin.com/in/zhu-bolin-717790191" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Nor Syarah Natasha */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/syarah_natasha.jpg" 
                    alt="Nor Syarah Natasha" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Nor Syarah Natasha</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Advisory Council</p>
                  <a 
                    href="https://www.linkedin.com/in/syarah-natasha-850928211" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Jaslyn Tan Xuan Ning */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Jaslyn_Tan.jpg" 
                    alt="Jaslyn Tan Xuan Ning" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Jaslyn Tan Xuan Ning</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee</p>
                  <a 
                    href="https://www.linkedin.com/in/jaslyn-tan-1b5681356" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Vaithiyanathan Sri Kesava Raman */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/kesava.png" 
                    alt="Vaithiyanathan Sri Kesava Raman" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Vaithiyanathan Sri Kesava Raman</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Advisory Council</p>
                  <a 
                    href="https://www.linkedin.com/in/kesava-raman" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Lim Le Shi */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/rachel.png" 
                    alt="Lim Le Shi" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Lim Le Shi</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Advisory Council</p>
                  <a 
                    href="https://www.linkedin.com/in/rachel-sage-lim-le-shi-7548bb209" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Cham Si Ao */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Cham_Si_Ao.jpg" 
                    alt="Cham Si Ao" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Cham Si Ao</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">SYAI Inspire Subcommittee</p>
                  <a 
                    href="https://www.linkedin.com/in/si-ao-cham-920037213" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Vijeyakumar Dakshaa */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Vijeyakumar_Dakshaa.PNG" 
                    alt="Vijeyakumar Dakshaa" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Vijeyakumar Dakshaa</h3>
                  {/* Role uses primary color */}
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="https://www.linkedin.com/in/dakshaa-v" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Min Thet Khine */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Min_Thet_Khine.JPG" 
                    alt="Min Thet Khine" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Min Thet Khine</h3>
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="https://www.linkedin.com/in/min-thet-khine2005/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Perynn Neo */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Perynn_Neo.jpg" 
                    alt="Perynn Neo" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Perynn Neo</h3>
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="https://www.linkedin.com/in/perynn-neo-377194314" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Chew Yee Jing */}
              <div className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src="/team/Chew_Yee_Jing.jpg" 
                    alt="Chew Yee Jing" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">Chew Yee Jing</h3>
                  <p className="text-primary-light dark:text-primary-dark text-xs mb-1">Subcommittee member</p>
                  <a 
                    href="https://www.linkedin.com/in/chew-y-b1bb3b239/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#https://forms.gle/VKgYwhSoB9dChtct8"
              className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Join Our Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Our <span className="text-primary-light dark:text-primary-dark">Partners</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Working together with Singapore&apos;s leading organizations to advance AI education and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {/* Enhance Logo Hovers */}
            <div className="flex justify-center p-4 hover:scale-110 transition-all duration-300 transform">
              <img 
                src="/partners/AISG.png" 
                alt="AI Singapore" 
                className="max-h-24 object-contain hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="flex justify-center p-4 hover:scale-110 transition-all duration-300 transform">
              <img 
                src="/partners/YCS.png" 
                alt="Youth Cyber Singapore" 
                className="max-h-24 object-contain hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="flex justify-center p-4 hover:scale-110 transition-all duration-300 transform">
              <img 
                src="/partners/YAC.png" 
                alt="Young NTUC Advisory Committee" 
                className="max-h-24 object-contain hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="flex justify-center p-4 hover:scale-110 transition-all duration-300 transform">
              <img 
                src="/partners/NYC.png" 
                alt="National Youth Council" 
                className="max-h-24 object-contain hover:scale-105 transition-transform"
              />
            </div>
            
            <div className="flex justify-center p-4 hover:scale-110 transition-all duration-300 transform">
              <img 
                src="/partners/FORYOUTHS.png" 
                alt="For Youths" 
                className="max-h-24 object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Event <span className="text-primary-light dark:text-primary-dark">Gallery</span>
            </h2>
            {/* Use secondary color for underline */}
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              A glimpse into our vibrant community events and activities.
            </p>
          </div>

          <div className="space-y-8">
            {/* Carousel 1: Left to Right */}
            <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
              <div className="flex marquee-content-ltr whitespace-nowrap"> {/* Changed class */} 
                {[
                  "/gallery/yac2.png",
                  "/gallery/syaigathering3.png",
                  "/gallery/mindfulhacksxsyai2.png",
                  "/gallery/deepracedash2.png",
                  "/gallery/yac2.png", // Repeat for seamless loop
                  "/gallery/syaigathering3.png",
                  "/gallery/mindfulhacksxsyai2.png",
                  "/gallery/deepracedash2.png",
                ].map((src, index) => (
                  <div key={`ltr-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 2: Right to Left */}
            <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
              <div className="flex marquee-content-rtl whitespace-nowrap"> {/* Changed class */} 
                {[
                  "/gallery/yac.png",
                  "/gallery/syaigathering2.png",
                  "/gallery/mindfulhacksxsyai.png",
                  "/gallery/deepracedash3.png",
                  "/gallery/yac.png", // Repeat for seamless loop
                  "/gallery/syaigathering2.png",
                  "/gallery/mindfulhacksxsyai.png",
                  "/gallery/deepracedash3.png",
                ].map((src, index) => (
                  <div key={`rtl-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel 3: Left to Right */}
            <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
              <div className="flex marquee-content-ltr whitespace-nowrap"> {/* Changed class */} 
                {[
                  "/gallery/syaigathering1.png",
                  "/gallery/deepracedash1.png",
                  "/gallery/cedar2.png",
                  "/gallery/cedar1.png",
                  "/gallery/syaigathering1.png", // Repeat for seamless loop
                  "/gallery/deepracedash1.png",
                  "/gallery/cedar2.png",
                  "/gallery/cedar1.png",
                ].map((src, index) => (
                  <div key={`ltr2-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                      <img src={src} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ADD THE CONTACT SECTION HERE */}
      <ContactSection />

      <Footer />

      <style jsx global>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-content-ltr {
          animation: marquee-ltr 30s linear infinite;
        }
        .marquee-content-rtl {
          animation: marquee-rtl 30s linear infinite;
        }
        .overflow-hidden:hover > .marquee-content-ltr,
        .overflow-hidden:hover > .marquee-content-rtl {
            animation-play-state: paused;
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
         @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
