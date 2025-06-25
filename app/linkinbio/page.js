"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";
import {
  FaTelegramPlane,
  FaDiscord,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function LinkInBio() {
  const posthog = usePostHog();
  const [currentUrl, setCurrentUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate random shimmer colors
  const generateRandomColor = () => {
    const colors = [
      "from-blue-300 to-blue-500",
      "from-purple-300 to-purple-500",
      "from-pink-300 to-pink-500",
      "from-indigo-300 to-indigo-500",
      "from-cyan-300 to-cyan-500",
      "from-teal-300 to-teal-500",
      "from-emerald-300 to-emerald-500",
      "from-green-300 to-green-500",
      "from-lime-300 to-lime-500",
      "from-yellow-300 to-yellow-500",
      "from-orange-300 to-orange-500",
      "from-red-300 to-red-500",
      "from-rose-300 to-rose-500",
      "from-violet-300 to-violet-500",
      "from-fuchsia-300 to-fuchsia-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [shimmerColors] = useState(() =>
    Array.from({ length: 6 }, () => generateRandomColor())
  );

  const socials = [
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5" />,
      href: "https://www.instagram.com/sgyouthai/",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/sgyouthai",
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane className="w-5 h-5" />,
      href: "https://t.me/sgyouthai",
    },
    {
      name: "Discord",
      icon: <FaDiscord className="w-5 h-5" />,
      href: "https://discord.gg/TacK5vbeDc",
    },
  ];

  // Fetch links from database
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/linkinbio");
        if (!response.ok) {
          throw new Error("Failed to fetch links");
        }
        const data = await response.json();

        // Transform database data to match the expected format
        const transformedLinks = data.map((link) => ({
          name: link.title,
          href: link.url,
        }));

        setLinks(transformedLinks);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError(err.message);
        // Fallback to hardcoded links if database fails
        setLinks([
          {
            name: "🚀 Join SYAI Committee Today!",
            href: "https://forms.gle/VKgYwhSoB9dChtct8",
          },
          {
            name: "🤝 Monthly AI Meetup (2025)",
            href: "https://forms.gle/Nvi4jmvXo6mh2PMV6",
          },
          {
            name: "🎓 SYAI Bootcamps & Workshops",
            href: "https://sgyouthai.org/#bootcamps",
          },
          {
            name: "📰 SYAI Times Newsletter",
            href: "https://t.me/sgyouthai",
          },
          {
            name: "💬 Join Our Discord Community",
            href: "https://discord.gg/TacK5vbeDc",
          },
          {
            name: "🌐 Visit Our Website",
            href: "https://sgyouthai.org/",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Set the current URL (browser-only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const capture_linkInBio = (linkName) => {
    posthog?.capture(`Clicked LinkInBio: ${linkName}`);
  };

  const capture_social = (linkName) => {
    posthog?.capture(`Clicked Social: ${linkName}`);
  };

  return (
    <>
      <div className="min-h-screen animated-gradient-aurora-sides relative overflow-auto dark">
        <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-md w-full text-center">
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <div className="relative glass-card-strong rounded-full p-2">
                <Image
                  src="/SYAI_Logo_White.png"
                  className="h-32 w-32 rounded-full object-cover filter-none isolation-isolate"
                  width={128}
                  height={128}
                  alt="SYAI Logo"
                  priority
                  style={{ filter: "none !important", isolation: "isolate" }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-500/20 pointer-events-none"></div>
              </div>
            </div>

            {/* Title */}
            <div className="glass-card-strong rounded-2xl p-6 mb-6">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                Singapore Youth AI
              </h1>
              <p className="text-black dark:text-gray-100 font-medium linkinbio-text">
                @sgyouthai
              </p>
              <p className="text-black dark:text-gray-200 mt-2 font-medium linkinbio-text">
                Empowering the next generation of AI innovators 🤖✨
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3 mb-8">
              {loading ? (
                // Loading skeleton with random shimmer colors
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl px-6 py-4 relative overflow-hidden"
                    >
                      <div
                        className={`h-4 bg-gradient-to-r ${shimmerColors[i]} rounded w-3/4 mx-auto animate-pulse`}
                      ></div>
                      {/* Additional shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                // Error state
                <div
                  className="glass-card rounded-xl px-6 py-4 text-red-700 dark:text-red-400 font-semibold"
                  style={{ color: "#dc2626" }}
                >
                  Failed to load links. Please try again later.
                </div>
              ) : (
                // Loaded links
                links.map((link, idx) => (
                  <Link
                    key={link.name + idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => capture_linkInBio(link.name)}
                    className="glass-card glass-hover block w-full px-6 py-4 rounded-xl
                             text-black dark:text-gray-100 linkinbio-link
                             font-semibold text-center transition-all duration-300
                             hover:scale-[1.02] transform group"
                  >
                    <span className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {link.name}
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* Social Media Icons */}
            <div className="glass-card-subtle rounded-2xl p-6">
              <h3 className="text-sm font-bold text-black dark:text-gray-200 mb-4 uppercase tracking-wider">
                Connect With Us
              </h3>
              <div className="flex justify-center space-x-4">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => capture_social(social.name)}
                    className="glass-card glass-hover p-3 rounded-full
                             text-black dark:text-gray-300
                             hover:text-blue-600 dark:hover:text-blue-400
                             transition-all duration-300 hover:scale-110 transform
                             hover:shadow-lg"
                    title={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs font-medium text-black dark:text-gray-300">
                © {new Date().getFullYear()} Singapore Youth AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
