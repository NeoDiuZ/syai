# Analytics Setup Guide

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Search Console (optional)
# NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

## PostHog Setup

1. Go to [PostHog](https://posthog.com) and create an account
2. Create a new project
3. Copy your Project API Key
4. Add it to your environment variables as `NEXT_PUBLIC_POSTHOG_KEY`

## Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for your website
3. Get your Measurement ID (starts with G-)
4. Add it to your environment variables as `NEXT_PUBLIC_GA_ID`

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (sgyouthai.org)
3. Verify ownership using the HTML meta tag method
4. Add the verification code to your environment variables

## SEO Improvements Implemented

- Comprehensive meta tags for better search visibility
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for organization
- Canonical URLs
- Geographic meta tags for Singapore
- Enhanced keywords targeting "Singapore Youth AI", "SYAI", etc.

## Key Tracking Events

The following events are automatically tracked:
- Page views
- Link clicks in bio page
- Social media clicks
- Form submissions (newsletter, contact)
- Button clicks on main site

## Mobile Optimization

- Fixed linkinbio page styling for better mobile experience
- Removed problematic background styling
- Enhanced responsive design 