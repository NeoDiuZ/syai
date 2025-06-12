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

  const links = [
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
  ];

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
    <div className="min-h-screen animated-gradient-aurora-sides relative">
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full text-center">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative glass-card-strong rounded-full p-2">
              <Image
                src="/SYAI_Logo.png"
                className="h-32 w-32 rounded-full object-cover filter-none isolation-isolate"
                width={128}
                height={128}
                alt="SYAI Logo"
                priority
                style={{ filter: 'none !important', isolation: 'isolate' }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 pointer-events-none"></div>
            </div>
          </div>

          {/* Title */}
          <div className="glass-card-strong rounded-2xl p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Singapore Youth AI
            </h1>
            <p className="text-gray-600 dark:text-gray-300">@sgyouthai</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Empowering the next generation of AI innovators 🤖✨
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 mb-10">
            {links.map((link, idx) => (
              <Link
                key={link.name + idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => capture_linkInBio(link.name)}
                className="glass-card glass-hover block w-full px-6 py-4 rounded-xl 
                           text-gray-900 dark:text-white 
                           font-medium text-center transition-all duration-300 
                           hover:scale-[1.02] transform group"
              >
                <span className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="glass-card-subtle rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider">
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
                             text-gray-600 dark:text-gray-400 
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
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Singapore Youth AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
