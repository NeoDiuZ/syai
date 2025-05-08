"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  /*
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
  */

  // Define navigation items
  const navItems = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Bootcamps", href: "#bootcamps" },
    { name: "AIConnect", href: "#aiconnect" },
    { name: "AITimes", href: "#aitimes" },
    { name: "Partners", href: "#partners" },
    { name: "Team", href: "#team" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const actionButtons = [
    { name: "Join Community", href: "#join-community", isPrimary: true },
    { name: "Join Committee", href: "#join-committee", isPrimary: false },
  ];

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-light dark:text-primary-dark">
              <span className="text-sm mr-1 text-secondary-light dark:text-secondary-dark">SY</span>AI
            </Link>
          </div>

          {/* Menu button - always visible on all screen sizes */}
          <div className="flex items-center h-full">
            <button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu - Right Side Overlay (for all screen sizes) */}
      {mounted && (
        <>
          <div
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          ></div>
          
          <div
            id="mobile-menu-container"
            className={`fixed top-0 right-0 w-3/4 max-w-sm h-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } overflow-auto`}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
            
            <div className="px-4 py-2 h-[calc(100%-5rem)] flex flex-col">
              <div className="flex-grow">
                <h3 className="text-xs uppercase tracking-wider text-text-light/60 dark:text-text-dark/60 font-semibold mb-3 px-2">Navigation</h3>
                <div className="space-y-1 mb-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-2.5 px-4 rounded-lg text-base font-medium text-text-light dark:text-text-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xs uppercase tracking-wider text-text-light/60 dark:text-text-dark/60 font-semibold mb-3 px-2">JOIN US</h3>
                  <div className="space-y-2.5">
                    {actionButtons.map((button) => (
                      <Link
                        key={button.name}
                        href={button.href}
                        className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                          button.isPrimary
                            ? "bg-primary-light dark:bg-primary-dark text-white"
                            : "border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10"
                        } transition-colors text-center`}
                        onClick={handleLinkClick}
                      >
                        {button.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center text-text-light/60 dark:text-text-dark/60 text-sm mt-auto py-4">
                <p>© {new Date().getFullYear()} Singapore Youth AI</p>
                <p className="mt-1">Building the future together</p>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar; 