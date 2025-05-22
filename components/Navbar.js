"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  // Close menu when clicking outside
  /*
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('mobile-menu-container');
      const menuButton = document.getElementById('menu-button');
      
      if (isMenuOpen && menu && !menu.contains(event.target) && menuButton && !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  */

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Define navigation items
  const navItems = [
    { name: "About", href: "#about" },
    { name: "Bootcamps", href: "#bootcamps" },
    { name: "AIConnect", href: "#aiconnect" },
    { name: "AITimes", href: "#aitimes" },
    { name: "Partners", href: "#partners" },
    { name: "Team", href: "#team" },
    { name: "Gallery", href: "#gallery" },
  ];

  const actionButtons = [
    { name: "Join Telegram", href: "https://t.me/sgyouthai", isPrimary: true, type: "link" },
    { name: "Join Discord", href: "https://discord.gg/TacK5vbeDc", isPrimary: true, type: "link" },
  ];

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/SYAI_Logo.png"
                alt="SYAI Logo"
                width={60}
                height={60}
                className="h-12 w-12 md:h-14 md:w-14"
                priority
              />
              <span className="font-bold text-xl md:text-2xl text-text-light dark:text-text-dark">
                SY<span className="text-primary-light dark:text-primary-dark">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 hover:-translate-y-0.5 transform transition-all duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://t.me/sgyouthai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Join Telegram</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
            </Link>
            <Link
              href="https://discord.gg/TacK5vbeDc"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Join Discord</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Right Side Overlay */}
      {mounted && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
          
          <div
            id="mobile-menu-container"
            className={`fixed top-0 right-0 w-full max-w-xs h-full bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } flex flex-col overflow-hidden`}
          >
            <div className="flex items-center justify-between p-4 border-b border-surface-light dark:border-surface-dark">
              <span className="font-semibold text-lg text-text-light dark:text-text-dark">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:bg-surface-light/50 dark:hover:bg-surface-dark/50 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="px-2 py-3 flex-grow flex flex-col overflow-y-auto">
              <div className="flex-grow">
                <div className="space-y-1 mb-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-3 rounded-lg text-base font-medium text-text-light dark:text-text-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                  <h3 className="text-xs uppercase tracking-wider text-text-light/60 dark:text-text-dark/60 font-semibold mb-3 px-2">Get Involved</h3>
                  <div className="space-y-2.5">
                    {actionButtons.map((button) => (
                      <Link
                        key={button.name}
                        href={button.href}
                        target={button.type === 'link' ? '_blank' : '_self'}
                        rel={button.type === 'link' ? 'noopener noreferrer' : undefined}
                        className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors text-center ${
                          button.isPrimary
                            ? "text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group animate-gradient-x"
                            : "border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10"
                        }`}
                        onClick={handleLinkClick}
                      >
                        <span className="relative z-10">{button.name}</span>
                        {button.isPrimary && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center text-text-light/60 dark:text-text-dark/60 text-xs mt-auto py-4 border-t border-gray-200/60 dark:border-gray-700/60">
                <p>© {new Date().getFullYear()} Singapore Youth AI</p>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar; 