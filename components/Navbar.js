"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePostHog } from "posthog-js/react";

// Icons
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { theme, setTheme } = useTheme();
  const posthog = usePostHog();

  // Add useEffect to set mounted after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Define navigation items
  const navItems = [
    { name: "About", href: "#about", type: "scroll" },
    { name: "Bootcamps", href: "#bootcamps", type: "scroll" },
    { name: "AIConnect", href: "#aiconnect", type: "scroll" },
    { name: "AITimes", href: "#aitimes", type: "scroll" },
    { name: "Partners", href: "#partners", type: "scroll" },
    { name: "Team", href: "#team", type: "scroll" },
    { name: "Gallery", href: "#gallery", type: "scroll" },
  ];

  const actionButtons = [
    {
      name: "Join Telegram",
      href: "https://t.me/sgyouthai",
      isPrimary: true,
      type: "link",
    },
    {
      name: "Join Discord",
      href: "https://discord.gg/TacK5vbeDc",
      isPrimary: true,
      type: "link",
    },
  ];

  // Close menu when clicking a link
  const handleLinkClick = (item) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    if (item.type === "link" && item.href.startsWith("/")) {
      posthog?.capture("navigation_clicked", {
        section: item.name,
        destination: item.href,
        source: "navbar",
      });
    }
  };

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setOpenDropdown(null);

    posthog?.capture("navigation_clicked", {
      section: href.replace("#", ""),
      source: "navbar",
    });

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleExternalLink = (name, href) => {
    posthog?.capture("external_link_clicked", {
      link_name: name,
      destination: href,
      source: "navbar",
    });
    setOpenDropdown(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface-dark/80 dark:bg-surface-dark/90 backdrop-blur-md shadow-lg" : "bg-surface-dark/40 backdrop-blur-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/SYAI_Logo_White.png"
                  alt="SYAI Logo"
                  width={60}
                  height={60}
                  className="h-12 w-12 md:h-14 md:w-14"
                  priority
                />
                <span className="font-bold text-xl md:text-2xl text-black dark:text-white drop-shadow-sm">
                  SY<span className="text-blue-800 dark:text-blue-400">AI</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className="px-3 py-2 rounded-md text-sm font-semibold text-black dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out flex items-center drop-shadow-sm"
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === item.name ? "transform rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleLinkClick(subItem)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-semibold text-black dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out drop-shadow-sm"
                    onClick={(e) =>
                      item.type === "scroll"
                        ? handleScroll(e, item.href)
                        : handleLinkClick(item)
                    }
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Link
                href="https://t.me/sgyouthai"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-gradient-button ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white"
                onClick={() =>
                  handleExternalLink("Join Telegram", "https://t.me/sgyouthai")
                }
              >
                Join Telegram
              </Link>
              <Link
                href="https://discord.gg/TacK5vbeDc"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-gradient-button ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                onClick={() =>
                  handleExternalLink(
                    "Join Discord",
                    "https://discord.gg/TacK5vbeDc"
                  )
                }
              >
                Join Discord
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors drop-shadow-sm"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="font-semibold text-lg text-black dark:text-white">
                Menu
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-4 py-6 overflow-y-auto h-full">
              {/* Navigation Links */}
              <div className="space-y-2 mb-8">
                {navItems.map((item) =>
                  item.type === "dropdown" ? (
                    <div key={item.name}>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                        className="w-full flex justify-between items-center py-3 px-3 rounded-lg text-base font-medium text-black dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.name}
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${openDropdown === item.name ? "transform rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-2 px-3 rounded-lg text-base font-medium text-black dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                              onClick={() => handleLinkClick(subItem)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-3 rounded-lg text-base font-medium text-black dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-800 dark:hover:text-blue-400 transition-colors"
                      onClick={(e) =>
                        item.type === "scroll"
                          ? handleScroll(e, item.href)
                          : handleLinkClick(item)
                      }
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">
                  Get Involved
                </h3>
                {actionButtons.map((button) => (
                  <Link
                    key={button.name}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-gradient-button block px-4 py-3 rounded-lg text-base font-medium text-center text-white"
                    onClick={() => {
                      handleExternalLink(button.name, button.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {button.name}
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center text-gray-500 dark:text-gray-400 text-xs mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p>&copy; {new Date().getFullYear()} Singapore Youth AI</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
