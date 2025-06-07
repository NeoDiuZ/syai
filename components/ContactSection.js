'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

export default function ContactSection() {
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
              Have a question, suggestion, or partnership inquiry? We'd love to hear from you!
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