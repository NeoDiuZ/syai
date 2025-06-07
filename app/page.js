'use client';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import { Linkedin } from "lucide-react"
import { promises as fs } from 'fs';
import path from 'path';

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

// Fetch team data from the API to work on Vercel
async function getTeamData() {
  // This URL construction will work for both local development and Vercel deployments.
  const apiUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/admin/team`
      : 'http://localhost:3000/api/admin/team';

  try {
      // Use { cache: 'no-store' } to ensure fresh data on every request,
      // which is essential for seeing updates from the admin panel immediately.
      const res = await fetch(apiUrl, { cache: 'no-store' });

      if (!res.ok) {
          console.error(`API fetch failed with status: ${res.status}. Falling back to local file.`);
          // This fallback is crucial for the initial build on Vercel (when services are not yet running)
          // and for resilience during local development.
          const fileContents = await fs.readFile(path.join(process.cwd(), 'data/team.json'), 'utf8');
          return JSON.parse(fileContents);
      }

      return await res.json();
  } catch (error) {
      console.error("Could not fetch team data, falling back to local file:", error);
      try {
          const fileContents = await fs.readFile(path.join(process.cwd(), 'data/team.json'), 'utf8');
          return JSON.parse(fileContents);
      } catch (fileError) {
          console.error("Could not read local fallback file:", fileError);
          return [];
      }
  }
}

// Updated TeamSection component
async function TeamSection() {
  const teamMembers = await getTeamData();

  const boardMembers = teamMembers.filter(m => ["Director & President", "Co-Founder", "Vice President", "Treasurer", "Secretary"].includes(m.role));
  const executiveCommittee = teamMembers.filter(m => ["Head of SYAI Inspire", "Head of SYAI Monthly Meetups"].includes(m.role));
  const subcommittee = teamMembers.filter(m => !boardMembers.includes(m) && !executiveCommittee.includes(m));

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
            Our <span className="text-primary-light dark:text-primary-dark">Team</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
          <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
            Meet the passionate individuals behind SYAI who are working together to build a community
            of AI enthusiasts and create innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Board Members Section - Top of Tree */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
              Board <span className="text-primary-light dark:text-primary-dark">Members</span>
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl">
                {boardMembers.map((member, index) => (
                  <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm">{member.name}</h3>
                      <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                      >
                        <Linkedin className="mr-1 h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Committee Section - Second Level */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
              Executive <span className="text-primary-light dark:text-primary-dark">Committee</span>
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl">
                {executiveCommittee.map((member, index) => (
                  <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm">{member.name}</h3>
                      <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                      >
                        <Linkedin className="mr-1 h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subcommittee Section - Bottom Level */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
              Sub<span className="text-primary-light dark:text-primary-dark">committee</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {subcommittee.map((member, index) => (
                <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm">{member.name}</h3>
                    <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                    <a 
                      href={member.linkedinUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                    >
                      <Linkedin className="mr-1 h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
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
  );
}

export default async function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-950">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-950">
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
          <TeamSection />

          {/* Partners Section */}
          <section id="partners" className="py-20 bg-surface-light dark:bg-surface-dark relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary-light/15 to-primary-light/15 dark:from-secondary-dark/15 dark:to-primary-dark/15 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Our <span className="text-primary-light dark:text-primary-dark">Partners</span>
                </h2>
                <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark mx-auto rounded-full"></div>
                <p className="mt-8 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  Working together with Singapore&apos;s leading organizations to advance AI education and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Enhanced Partner Cards */}
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/AISG.png" 
                        alt="AI Singapore" 
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/YCS.png" 
                        alt="Youth Cyber Singapore" 
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/YAC.png" 
                        alt="Young NTUC Advisory Committee" 
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/NYC.png" 
                        alt="National Youth Council" 
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/FORYOUTHS.png" 
                        alt="For Youths" 
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/NYPAI.png" 
                      alt="NYP AI"
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/SOI_Club.png" 
                      alt="SOI Club"
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <img 
                        src="/partners/SPAI.png" 
                      alt="SP AI"
                        className="max-h-20 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
