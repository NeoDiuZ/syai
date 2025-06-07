'use client';

import { useState } from 'react';
import { usePostHog } from 'posthog-js/react';

export default function NewsletterSubscriptionForm() {
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