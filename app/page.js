import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import TeamSection from "@/components/TeamSection";
import NewsletterSubscriptionForm from "@/components/NewsletterSubscriptionForm";
import ContactSection from "@/components/ContactSection";
import { totalMembers } from "./const";

export const dynamic = "force-dynamic";

export default function Page() {
  const aiMMImages = [
    "/AIMM/March.jpg",
    "/AIMM/MonthlyAIMeetupJun.jpg",
    "/AIMM/SYAI_FEB.jpg",
    "/AIMM/SYAI_FEB2.jpg",
    "/AIMM/SYAI_MARCH2.jpg",
    "/AIMM/SYAI_MARCH3.jpg",
    // "/gallery/yac2.png",
    // "/gallery/syaigathering3.png",
    // "/gallery/mindfulhacksxsyai2.png",
    // "/gallery/deepracedash2.png",
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <section id="about" className="py-20 bg-surface-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Our <span className="text-primary-light">Story</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-4 border border-primary-light/10 rounded-2xl bg-background-light">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20"></div>
                  <Image
                    src="/SYAI_Logo_White.png"
                    alt="SYAI Logo"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
                <div>
                  <p className="text-lg text-text-light opacity-90 mb-6">
                    Founded in 2023, Singapore Youth AI was created for students
                    by students from Polytechnics and Junior Colleges who share
                    a passion for artificial intelligence. Our organization
                    began as a way to bring together like-minded individuals
                    interested in AI technology and its applications. Today,
                    we&apos;ve flourished into a thriving community of over{" "}
                    {totalMembers}
                    youth innovators—and we continue to grow!
                  </p>
                  <p className="text-lg text-text-light opacity-90 mb-8">
                    We recognized a critical gap in Singapore&apos;s AI
                    landscape: despite significant interest among young
                    enthusiasts, there was no unified platform to channel this
                    energy. SYAI was established to fill this void, serving as
                    the premier hub for youth interested in AI. We provide a
                    collaborative space where young talents can connect, develop
                    their skills, and transform their aspirations into
                    impactful, Singapore-focused AI initiatives.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Glass Morphism Statistics Cards */}
                    <div className="glass-card glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content">
                        <div className="text-primary-light text-3xl mb-2">
                          {totalMembers}+
                        </div>
                        <div className="font-medium">Members</div>
                      </div>
                    </div>
                    <div className="glass-card glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content">
                        <div className="text-secondary-light text-3xl mb-2">
                          2000+
                        </div>
                        <div className="font-medium">Students Reached</div>
                      </div>
                    </div>
                    <div className="glass-card glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content">
                        <div className="text-primary-light text-3xl mb-2">
                          4
                        </div>
                        <div className="font-medium">Academic Partners</div>
                      </div>
                    </div>
                    <div className="glass-card glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content">
                        <div className="text-secondary-light text-3xl mb-2">
                          $64.3K
                        </div>
                        <div className="font-medium">Total Funding Secured</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bootcamps Section */}
          <section id="bootcamps" className="py-20 bg-surface-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI <span className="text-primary-light">Inspire</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  Our flagship education program is funded with $14,300 to
                  develop the next generation of AI educators. Through this
                  initiative, we collaborate with AI Singapore to launch
                  comprehensive bootcamps that prepare pre-university students
                  to become AI trainers.
                </p>
              </div>

              <div className="mb-12">
                <p className="text-lg max-w-5xl mx-auto text-text-light opacity-80 mb-8">
                  These intensive bootcamps cover:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Foundational AI concepts</span>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Practical AI coding skills</span>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>AI knowledge frameworks</span>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>AI risk and safety protocols</span>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Hands-on workshop experience</span>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      className="text-primary-light flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Presentation and teaching methodologies</span>
                  </div>
                </div>
              </div>

              <p className="text-lg max-w-5xl mx-auto text-text-light opacity-80 mb-8">
                We&apos;ve established partnerships with AI clubs across three
                polytechnics (Singapore Polytechnic, Nanyang Polytechnic, and
                Republic Polytechnic) to implement a CCA point program for
                organizing these bootcamps and recruiting volunteers.
                Participants receive certification upon completion of the
                two-day bootcamp conducted by industry engineers, with all meals
                provided. Graduates then volunteer to conduct AI workshops at
                secondary schools, sharing their knowledge while earning CCA
                points from their respective polytechnics.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bootcamp cards remain the same */}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="https://forms.gle/VnQC3ap5hW6k1ZHM7"
                  className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x bg-200%"
                >
                  <span className="relative z-10">
                    Sign up for SYAI Inspire Bootcamps
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x bg-200%"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* AIMM Section */}
          <section id="aimm" className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI{" "}
                  <span className="text-primary-light">AI Monthly Meetups</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  Our community engagement initiative, developed in
                  collaboration with YouthTechSG (previously known as Cyber
                  Youth Singapore), has secured $50,000 in funding to host
                  Monthly AI Meetups.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  {/* Replace existing Image with ImageCarousel */}
                  <ImageCarousel images={aiMMImages} interval={10000} />

                  <div className="space-y-6 mt-8">
                    {" "}
                    {/* Added mt-8 for spacing */}
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">
                          Expert Presentations
                        </h3>
                        <p className="text-text-light opacity-80">
                          Learn from industry experts and innovators sharing
                          cutting-edge AI developments.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">
                          Interactive Workshops
                        </h3>
                        <p className="text-text-light opacity-80">
                          Engage in hands-on skill-building sessions to enhance
                          your AI capabilities.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">
                          Networking Activities
                        </h3>
                        <p className="text-text-light opacity-80">
                          Connect with peers and discover collaboration
                          opportunities in a supportive environment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    Monthly Events
                  </h3>
                  <div className="space-y-4">
                    {/* Glass Morphism Event Cards */}
                    <div className="glass-card-strong glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">Fireside Chats</h4>
                          <p className="text-text-light opacity-70 text-sm mb-2">
                            Monthly • Various Locations
                          </p>
                          <p className="text-text-light opacity-80">
                            Intimate discussions with AI practitioners sharing
                            real-world experiences and insights.
                          </p>
                        </div>
                        {/* Use primary color for tag bg */}
                        <span className="bg-primary-light/10 text-primary-light px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Free
                        </span>
                      </div>
                    </div>

                    <div className="glass-card-strong glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">
                            Project Collaborations
                          </h4>
                          <p className="text-text-light opacity-70 text-sm mb-2">
                            Monthly • Various Locations
                          </p>
                          <p className="text-text-light opacity-80">
                            Team up with fellow enthusiasts to work on
                            innovative AI solutions to real problems.
                          </p>
                        </div>
                        {/* Use secondary color for tag bg */}
                        <span className="bg-secondary-light/10 text-secondary-light px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Members
                        </span>
                      </div>
                    </div>

                    <div className="glass-card-strong glass-hover p-6 rounded-lg transition-all duration-300">
                      <div className="glass-content flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">
                            Social Activities
                          </h4>
                          <p className="text-text-light opacity-70 text-sm mb-2">
                            Monthly • Various Locations
                          </p>
                          <p className="text-text-light opacity-80">
                            Build relationships with refreshments and networking
                            in a relaxed setting.
                          </p>
                        </div>
                        {/* Use primary color for tag bg */}
                        <span className="bg-primary-light/10 text-primary-light px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    {/* Enhanced Button Hover */}
                    <Link
                      href="https://www.sgyouthai.org/link/aimm-signup"
                      className="animated-gradient-button rounded-lg px-6 py-3 text-white font-semibold inline-flex items-center"
                    >
                      Register for this month&apos;s AI Meetup
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AITimes Section */}
          <section id="aitimes" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI <span className="text-primary-light">Times</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  Singapore&apos;s premier youth-focused AI news platform,
                  keeping our community informed about developments in the
                  rapidly evolving AI landscape worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Daily Newsletters
                  </h3>
                  <p className="text-lg text-text-light opacity-80 mb-6">
                    Our curated daily newsletters help students track the latest
                    innovations, research breakthroughs, and industry trends in
                    artificial intelligence.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Latest AI research and breakthroughs</span>
                    </div>
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Industry applications and case studies</span>
                    </div>
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Policy and ethical considerations</span>
                    </div>
                  </div>
                  <NewsletterSubscriptionForm />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Singapore AI Events Calendar
                  </h3>
                  <p className="text-lg text-text-light opacity-80 mb-6">
                    We aggregate information about AI events throughout
                    Singapore, creating a centralized calendar for the AI
                    community to ensure ambitious youth never miss valuable
                    opportunities.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Hackathons and competitions</span>
                    </div>
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Workshops and learning opportunities</span>
                    </div>
                    <div className="flex items-start space-x-3">
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
                        className="text-primary-light flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Conferences and networking events</span>
                    </div>
                  </div>

                  <Link
                    href="#"
                    className="animated-gradient-button rounded-lg px-6 py-3 text-white font-semibold inline-flex items-center"
                  >
                    View AI Events Calendar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Article cards remain the same */}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="#"
                  className="animated-gradient-button rounded-lg px-6 py-3 text-white font-semibold inline-flex items-center"
                >
                  View All Articles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Secondary School Engagements Section */}
          <section
            id="secondary-school-engagements"
            className="py-20 bg-surface-light"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Secondary School{" "}
                  <span className="text-primary-light">Engagements</span>
                </h2>
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  SYAI brings AI to life for secondary school students! Our
                  engaging workshops and inspiring assembly talks are designed
                  to demystify Artificial Intelligence and empower the next
                  generation of innovators.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    Why Our AI Engagements?
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          Future-Ready Skills
                        </h4>
                        <p className="text-text-light opacity-80">
                          We introduce AI as a pivotal skill for
                          Singapore&apos;s Smart Nation future. Early, exciting
                          exposure makes all the difference!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 12l2 2 4-4"></path>
                          <path d="M21 12c.552 0 1-.448 1-1V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6c0 .552.448 1 1 1"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          Ethical & Critical Thinking
                        </h4>
                        <p className="text-text-light opacity-80">
                          Students explore AI&apos;s societal impact and ethical
                          dimensions, fostering a responsible and thoughtful
                          approach to technology.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="10,8 16,12 10,16 10,8"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-lg">
                          Engaging & Accessible
                        </h4>
                        <p className="text-text-light opacity-80">
                          Our fun, beginner-friendly sessions spark curiosity
                          and build confidence, making complex AI concepts easy
                          to grasp and exciting to learn.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/gallery/cedar1.png"
                    alt="SYAI Assembly Talk at Cedar Girls' Secondary School"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Assembly Talks Card */}
                <div className="glass-card-strong glass-hover p-8 rounded-xl transition-all duration-300">
                  <div className="glass-content">
                    <div className="flex items-center mb-4">
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
                        className="text-primary-light mr-3"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                      </svg>
                      <h3 className="text-2xl font-semibold">Assembly Talks</h3>
                    </div>
                    <p className="text-text-light opacity-80 mb-4">
                      Large-scale, cohort-wide learning experiences designed to
                      ignite students&apos; passion for AI and its
                      possibilities.
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Duration:</span>
                        <span>1 - 1.5 Hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Target:</span>
                        <span>Large student groups</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Recommended:</span>
                        <span>Secondary 3 students</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workshop Programs Card */}
                <div className="glass-card-strong glass-hover p-8 rounded-xl transition-all duration-300">
                  <div className="glass-content">
                    <div className="flex items-center mb-4">
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
                        className="text-secondary-light mr-3"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      <h3 className="text-2xl font-semibold">
                        Workshop Programs
                      </h3>
                    </div>
                    <p className="text-text-light opacity-80 mb-4">
                      Interactive hands-on sessions covering AI fundamentals,
                      practical applications, and ethical considerations.
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary-light mt-1 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>AI sharing sessions by Youth AI Speakers</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary-light mt-1 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Interactive fireside chat Q&A sessions</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary-light mt-1 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Hands-on AI tools and demonstrations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="mailto:hello@sgyouthai.org?subject=Enquiry%3A%20SYAI%20Inspire%20for%20Secondary%20Schools"
                  className="animated-gradient-button rounded-lg px-8 py-4 text-white font-semibold inline-flex items-center text-lg"
                >
                  Send Enquiry
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Join Committee Section */}
          <TeamSection />

          {/* Partners Section */}
          <section id="partners" className="py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary-light/15 to-primary-light/15 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Our <span className="text-primary-light">Partners</span>
                </h2>
                <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-primary-light to-secondary-light mx-auto rounded-full"></div>
                <p className="mt-8 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  Working together with Singapore&apos;s leading organizations
                  to advance AI education and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Premium Glass Morphism Partner Cards */}
                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-blue-50/60 to-blue-50/60 dark:from-gray-800/80 dark:via-blue-900/40 dark:to-blue-900/40">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    {/* Floating orb effect */}
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/AI Singapore.png"
                        alt="AI Singapore"
                        width={160}
                        height={80}
                        className="max-h-24 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    {/* Premium shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-emerald-50/60 to-blue-50/60 dark:from-gray-800/80 dark:via-emerald-900/40 dark:to-blue-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/YCS.png"
                        alt="Youth Corps Singapore"
                        width={200}
                        height={100}
                        className="max-h-24 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-emerald-50/60 to-blue-50/60 dark:from-gray-800/80 dark:via-emerald-900/40 dark:to-blue-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/YouthTechSG.png"
                        alt="Youth Tech Singapore"
                        width={200}
                        height={100}
                        className="max-h-24 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-blue-50/60 to-pink-50/60 dark:from-gray-800/80 dark:via-blue-900/40 dark:to-pink-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-pink-500/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-pink-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/E27.png"
                        alt="E27"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-cyan-50/60 to-blue-50/60 dark:from-gray-800/80 dark:via-cyan-900/40 dark:to-blue-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/NYC.png"
                        alt="National Youth Council"
                        width={240}
                        height={120}
                        className="max-h-32 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-orange-50/60 to-red-50/60 dark:from-gray-800/80 dark:via-orange-900/40 dark:to-red-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-red-500/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/FORYOUTHS.png"
                        alt="For Youths"
                        width={320}
                        height={160}
                        className="max-h-40 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-green-50/60 to-emerald-50/60 dark:from-gray-800/80 dark:via-green-900/40 dark:to-emerald-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/NYPAI.png"
                        alt="NYP AI"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-indigo-50/60 to-blue-50/60 dark:from-gray-800/80 dark:via-indigo-900/40 dark:to-blue-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 via-blue-500/10 to-violet-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/SOI_Club.png"
                        alt="SOI Club"
                        width={320}
                        height={160}
                        className="max-h-40 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="glass-card-strong glass-hover rounded-2xl p-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-rose-50/60 to-pink-50/60 dark:from-gray-800/80 dark:via-rose-900/40 dark:to-pink-900/40">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-pink-500/10 to-fuchsia-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image
                        src="/partners/SPAI.png"
                        alt="SP AI"
                        width={320}
                        height={160}
                        className="max-h-40 w-auto object-contain group-hover:scale-110 transition-all duration-500 filter-none isolation-isolate"
                        style={{
                          filter: "none !important",
                          isolation: "isolate",
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-20">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Event <span className="text-primary-light">Gallery</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light opacity-80">
                  A glimpse into our vibrant community events and activities.
                </p>
              </div>

              <div className="space-y-8">
                {/* Carousel 1: Left to Right - Infinite Loop */}
                <div className="overflow-hidden w-full">
                  <div className="flex marquee-content-ltr whitespace-nowrap">
                    {/* Create infinite loop by repeating the image set multiple times */}
                    {Array(4)
                      .fill([
                        "/gallery/yac2.png",
                        "/gallery/syaigathering3.png",
                        "/gallery/mindfulhacksxsyai2.png",
                        "/gallery/deepracedash2.png",
                      ])
                      .flat()
                      .map((src, index) => (
                        <div
                          key={`ltr-${index}`}
                          className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2"
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={src}
                              alt={`Gallery image ${(index % 4) + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Carousel 2: Right to Left - Infinite Loop */}
                <div className="overflow-hidden w-full">
                  <div className="flex marquee-content-rtl whitespace-nowrap">
                    {/* Create infinite loop by repeating the image set multiple times */}
                    {Array(4)
                      .fill([
                        "/gallery/yac.png",
                        "/gallery/syaigathering2.png",
                        "/gallery/mindfulhacksxsyai.png",
                        "/gallery/deepracedash3.png",
                      ])
                      .flat()
                      .map((src, index) => (
                        <div
                          key={`rtl-${index}`}
                          className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2"
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={src}
                              alt={`Gallery image ${(index % 4) + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Carousel 3: Left to Right - Infinite Loop */}
                <div className="overflow-hidden w-full">
                  <div className="flex marquee-content-ltr whitespace-nowrap">
                    {/* Create infinite loop by repeating the image set multiple times */}
                    {Array(4)
                      .fill([
                        "/gallery/syaigathering1.png",
                        "/gallery/deepracedash1.png",
                        "/gallery/cedar2.png",
                        "/gallery/cedar1.png",
                      ])
                      .flat()
                      .map((src, index) => (
                        <div
                          key={`ltr2-${index}`}
                          className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2"
                        >
                          <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                            <Image
                              src={src}
                              alt={`Gallery image ${(index % 4) + 1}`}
                              width={400}
                              height={300}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ADD THE CONTACT SECTION HERE */}
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
