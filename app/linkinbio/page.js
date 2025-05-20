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
      name: "Echelon Singapore 2025 by e27",
      href: "https://sgyouthai.org/events/echelon2025",
    },
    {
      name: "CYS x SYAI Monthly AI Meetup (May 2025)",
      href: "https://aisdc.aisingapore.org/",
    },
    {
      name: "Join SYAI Committee today!",
      href: "https://forms.gle/VKgYwhSoB9dChtct8",
    },
    {
      name: "SYAI Inspire Volunteer Recruitment",
      href: "https://forms.gle/cYjQnkqBKeS9vpeo8",
    },
    {
      name: "Telegram",
      href: "https://t.me/sgyouthai",
    },
    {
      name: "Discord",
      href: "https://discord.gg/TacK5vbeDc",
    },
    {
      name: "Website",
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
    <div className="min-h-[calc(100vh-var(--navbar-height,10rem))] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Profile Image */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/SYAI_Logo.png" // Assuming this path is correct in /public
            className="h-24 w-24 rounded-full object-cover shadow-lg"
            width={96}
            height={96}
            alt="SYAI Logo"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-8">
          @sgyouthai
        </h1>

        {/* Links */}
        <div className="space-y-4 mb-10">
          {links.map((link, idx) => (
            <Link
              key={link.name + idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => capture_linkInBio(link.name)}
              className="flex items-center justify-center w-full px-6 py-4 rounded-lg 
                         bg-surface-light dark:bg-surface-dark 
                         hover:bg-primary-light/10 dark:hover:bg-primary-dark/10
                         border border-primary-light/30 dark:border-primary-dark/30
                         text-text-light dark:text-text-dark 
                         hover:text-primary-light dark:hover:text-primary-dark
                         font-medium text-center transition-colors duration-200 shadow-sm"d
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 