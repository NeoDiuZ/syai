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
      name: "Join SYAI Committee today!",
      href: "https://forms.gle/VKgYwhSoB9dChtct8",
    },
    {
      name: "CYS x SYAI Monthly AI Meetup (May 2025)",
      href: "https://aisdc.aisingapore.org/",
    },
    {
      name: "SYAI Inspire (AI Singapore Secondary School Workshop) Recruitment",
      href: "https://forms.gle/cYjQnkqBKeS9vpeo8",
    },
    {
      name: "SYAI Times (Telegram, Newsletter, AI events)",
      href: "https://t.me/sgyouthai",
    },
    {
      name: "Discord (Stay active within the community)",
      href: "https://discord.gg/TacK5vbeDc",
    },
    {
      name: "Website (sgyouthai.org)",
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Image
              src="/SYAI_Logo.png"
              className="h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-blue-500/20"
              width={128}
              height={128}
              alt="SYAI Logo"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Singapore Youth AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">@sgyouthai</p>

        {/* Links */}
        <div className="space-y-3 mb-10">
          {links.map((link, idx) => (
            <Link
              key={link.name + idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => capture_linkInBio(link.name)}
              className="flex items-center justify-center w-full px-6 py-4 rounded-xl 
                         bg-white dark:bg-gray-800 
                         hover:bg-blue-50 dark:hover:bg-gray-700
                         border border-gray-200 dark:border-gray-700
                         hover:border-blue-300 dark:hover:border-blue-600
                         text-gray-900 dark:text-white 
                         hover:text-blue-600 dark:hover:text-blue-400
                         font-medium text-center transition-all duration-200 
                         shadow-sm hover:shadow-md hover:scale-[1.02]
                         transform"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {socials.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => capture_social(social.name)}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 
                         hover:bg-blue-500 dark:hover:bg-blue-600 
                         text-gray-600 dark:text-gray-400 
                         hover:text-white dark:hover:text-white
                         transition-all duration-200 hover:scale-110 transform"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
