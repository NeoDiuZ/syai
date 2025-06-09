import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SYAI - Singapore Youth AI | Singapore's Premier Youth AI Community",
  description:
    "Singapore Youth AI (SYAI) is Singapore's leading youth-focused artificial intelligence community. Join 300+ students from polytechnics and junior colleges passionate about AI innovation, education, and technology.",
  keywords:
    "Singapore Youth AI, SYAI, Singapore AI community, youth AI Singapore, artificial intelligence Singapore, AI education, polytechnic AI, junior college AI, Singapore students AI, AI meetups Singapore, AI bootcamps Singapore",
  authors: [{ name: "Singapore Youth AI" }],
  creator: "Singapore Youth AI",
  publisher: "Singapore Youth AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sgyouthai.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SYAI - Singapore Youth AI | Singapore's Premier Youth AI Community",
    description:
      "Join Singapore's leading youth AI community with 300+ members from polytechnics and JCs. Explore AI education, meetups, and innovation opportunities.",
    url: "https://sgyouthai.org",
    siteName: "Singapore Youth AI",
    images: [
      {
        url: "/SYAI_Logo.png",
        width: 1200,
        height: 630,
        alt: "Singapore Youth AI Logo",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYAI - Singapore Youth AI | Singapore's Premier Youth AI Community",
    description:
      "Join Singapore's leading youth AI community with 300+ members from polytechnics and JCs. Explore AI education, meetups, and innovation opportunities.",
    images: ["/SYAI_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here when you have it
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://sgyouthai.org" />
        <meta name="geo.region" content="SG" />
        <meta name="geo.placename" content="Singapore" />
        <meta name="geo.position" content="1.3521;103.8198" />
        <meta name="ICBM" content="1.3521, 103.8198" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Singapore Youth AI",
              alternateName: "SYAI",
              url: "https://sgyouthai.org",
              logo: "https://sgyouthai.org/SYAI_Logo.png",
              description:
                "Singapore's premier youth-focused artificial intelligence community connecting 300+ students from polytechnics and junior colleges passionate about AI innovation and education.",
              foundingDate: "2023",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SG",
                addressRegion: "Singapore",
              },
              sameAs: [
                "https://www.instagram.com/sgyouthai/",
                "https://www.linkedin.com/company/sgyouthai",
                "https://t.me/sgyouthai",
                "https://discord.gg/TacK5vbeDc",
              ],
              memberOf: {
                "@type": "Organization",
                name: "AI Singapore",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overscroll-x-auto`}
      >
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalNavbar />
            <main className="flex-grow">
              {children}
            </main>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}