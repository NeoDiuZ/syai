import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ImageCarousel from "@/components/ImageCarousel";
import TeamSection from "@/components/TeamSection";
import NewsletterSubscriptionForm from "@/components/NewsletterSubscriptionForm";
import ContactSection from "@/components/ContactSection";

export default function Page() {
  const aiConnectImages = [
    "/gallery/yac2.png",
    "/gallery/syaigathering3.png",
    "/gallery/mindfulhacksxsyai2.png",
    "/gallery/deepracedash2.png",
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-950">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-950">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <section id="about" className="py-20 bg-surface-light dark:bg-surface-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Our <span className="text-primary-light dark:text-primary-dark">Story</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-4 border border-primary-light/10 dark:border-primary-dark/10 rounded-2xl bg-background-light dark:bg-background-dark">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20"></div>
                  <Image
                    src="/SYAI_Logo.png"
                    alt="SYAI Logo"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
                <div>
                  <p className="text-lg text-text-light/90 dark:text-text-dark/90 mb-6">
                    Founded in 2023, Singapore Youth AI was created for students by students from Polytechnics and Junior Colleges who share a passion for artificial intelligence. Our organization began as a way to bring together like-minded individuals interested in AI technology and its applications. Today, we&apos;ve flourished into a thriving community of over 300 youth innovators—and we continue to grow!
                  </p>
                  <p className="text-lg text-text-light/90 dark:text-text-dark/90 mb-8">
                    We recognized a critical gap in Singapore&apos;s AI landscape: despite significant interest among young enthusiasts, there was no unified platform to channel this energy. SYAI was established to fill this void, serving as the premier hub for youth interested in AI. We provide a collaborative space where young talents can connect, develop their skills, and transform their aspirations into impactful, Singapore-focused AI initiatives.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Enhanced Hover Effect */}
                    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <div className="text-primary-light dark:text-primary-dark text-3xl mb-2">300+</div>
                      <div className="font-medium">Active Members</div>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <div className="text-secondary-light dark:text-secondary-dark text-3xl mb-2">50+</div>
                      <div className="font-medium">Events Organized</div>
                  </div>
                    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <div className="text-primary-light dark:text-primary-dark text-3xl mb-2">4</div>
                      <div className="font-medium">Polytechnic Partners</div>
                    </div>
                    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                      <div className="text-secondary-light dark:text-secondary-dark text-3xl mb-2">$65K</div>
                      <div className="font-medium">Total Funding Secured</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bootcamps Section */}
          <section id="bootcamps" className="py-20 bg-surface-light dark:bg-surface-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI <span className="text-primary-light dark:text-primary-dark">Inspire</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  Our flagship education program is funded with $14,200 to develop the next generation of AI educators. 
                  Through this initiative, we collaborate with AI Singapore to launch comprehensive bootcamps that prepare 
                  pre-university students to become AI trainers.
                </p>
              </div>
              
              <div className="mb-12">
                <p className="text-lg max-w-4xl mx-auto text-text-light/80 dark:text-text-dark/80 mb-8">
                  These intensive bootcamps cover:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Foundational AI concepts</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Practical AI coding skills</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>AI knowledge frameworks</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>AI risk and safety protocols</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Hands-on workshop experience</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Presentation and teaching methodologies</span>
                  </div>
                </div>
              </div>

              <p className="text-lg max-w-5xl mx-auto text-text-light/80 dark:text-text-dark/80 mb-8">
                We&apos;ve established partnerships with AI clubs across four polytechnics (Singapore Polytechnic, Ngee Ann Polytechnic, Nanyang Polytechnic, and Republic Polytechnic) to implement a CCA point program for organizing these bootcamps and recruiting volunteers. Participants receive certification upon completion of the two-day bootcamp conducted by industry engineers, with all meals provided. Graduates then volunteer to conduct AI workshops at secondary schools, sharing their knowledge while earning CCA points from their respective polytechnics.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bootcamp cards remain the same */}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="https://forms.gle/cYjQnkqBKeS9vpeo8"
                  className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
                >
                  <span className="relative z-10">Sign up for SYAI Inspire Bootcamps</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* AIConnect Section */}
          <section id="aiconnect" className="py-20 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI <span className="text-primary-light dark:text-primary-dark">Connect</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  Our community engagement initiative, developed in collaboration with Cyber Youth Singapore, has secured $50,000 in funding to host monthly AI meetups.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  {/* Replace existing Image with ImageCarousel */}
                  <ImageCarousel images={aiConnectImages} /> 

                  <div className="space-y-6 mt-8"> {/* Added mt-8 for spacing */}
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Expert Presentations</h3>
                        <p className="text-text-light/80 dark:text-text-dark/80">
                          Learn from industry experts and innovators sharing cutting-edge AI developments.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Interactive Workshops</h3>
                        <p className="text-text-light/80 dark:text-text-dark/80">
                          Engage in hands-on skill-building sessions to enhance your AI capabilities.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center text-primary-light dark:text-primary-dark flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Networking Activities</h3>
                        <p className="text-text-light/80 dark:text-text-dark/80">
                          Connect with peers and discover collaboration opportunities in a supportive environment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold mb-4">Monthly Events</h3>
                  <div className="space-y-4">
                    {/* Enhance Card Hovers */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">Fireside Chats</h4>
                          <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                          <p className="text-text-light/80 dark:text-text-dark/80">
                            Intimate discussions with AI practitioners sharing real-world experiences and insights.
                          </p>
                        </div>
                        {/* Use primary color for tag bg */}
                        <span className="bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Free
                        </span>
                      </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">Project Collaborations</h4>
                          <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                          <p className="text-text-light/80 dark:text-text-dark/80">
                            Team up with fellow enthusiasts to work on innovative AI solutions to real problems.
                          </p>
                        </div>
                        {/* Use secondary color for tag bg */}
                        <span className="bg-secondary-light/10 dark:bg-secondary-dark/10 text-secondary-light dark:text-secondary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Members
                        </span>
                      </div>
                    </div>

                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg hover:border-primary-light dark:hover:border-primary-dark border border-transparent hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">Social Activities</h4>
                          <p className="text-text-light/70 dark:text-text-dark/70 text-sm mb-2">Monthly • Various Locations</p>
                          <p className="text-text-light/80 dark:text-text-dark/80">
                            Build relationships with refreshments and networking in a relaxed setting.
                          </p>
                        </div>
                        {/* Use primary color for tag bg */}
                        <span className="bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                     {/* Enhanced Button Hover */}
                    <Link href="https://aisdc.aisingapore.org/" className="rounded-lg px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-300 inline-flex items-center transform hover:shadow-lg relative overflow-hidden group animate-gradient-x">
                      <span className="relative z-10">Register for this month&apos;s AI Meetup</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AITimes Section */}
          <section id="aitimes" className="py-20 bg-surface-light dark:bg-surface-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  SYAI <span className="text-primary-light dark:text-primary-dark">Times</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  Singapore&apos;s premier youth-focused AI news platform, keeping our community informed about developments in the rapidly evolving AI landscape worldwide.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Daily Newsletters</h3>
                  <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
                    Our curated daily newsletters help students track the latest innovations, research breakthroughs, and industry trends in artificial intelligence.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Latest AI research and breakthroughs</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Industry applications and case studies</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Policy and ethical considerations</span>
                    </div>
                  </div>
                  <NewsletterSubscriptionForm />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Singapore AI Events Calendar</h3>
                  <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
                    We aggregate information about AI events throughout Singapore, creating a centralized calendar for the AI community to ensure ambitious youth never miss valuable opportunities.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Hackathons and competitions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Workshops and learning opportunities</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light dark:text-primary-dark flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Conferences and networking events</span>
                    </div>
                  </div>
                  
                  <Link href="#" className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x">
                    <span className="relative z-10">View AI Events Calendar</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
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
                  className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
                >
                  <span className="relative z-10">View All Articles</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link> 
              </div>
            </div>
          </section>

          {/* Join Committee Section */}
          <TeamSection />

          {/* Partners Section */}
          <section id="partners" className="py-20 bg-surface-light dark:bg-surface-dark relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-secondary-light/15 to-primary-light/15 dark:from-secondary-dark/15 dark:to-primary-dark/15 rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Our <span className="text-primary-light dark:text-primary-dark">Partners</span>
                </h2>
                <div className="mt-3 h-1.5 w-24 bg-gradient-to-r from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark mx-auto rounded-full"></div>
                <p className="mt-8 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  Working together with Singapore&apos;s leading organizations to advance AI education and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Enhanced Partner Cards */}
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/AISG.png" 
                        alt="AI Singapore"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/YCS.png" 
                        alt="Youth Cyber Singapore"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/YAC.png" 
                        alt="Young NTUC Advisory Committee"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/NYC.png" 
                        alt="National Youth Council"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/FORYOUTHS.png" 
                        alt="For Youths"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/NYPAI.png" 
                      alt="NYP AI"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/SOI_Club.png" 
                      alt="SOI Club"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                </div>

                <div className="group perspective-1000">
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-100 dark:via-white dark:to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-200/50 dark:border-gray-300/50 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-secondary-light/5 dark:from-primary-dark/5 dark:to-secondary-dark/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center h-24">
                      <Image 
                        src="/partners/SPAI.png" 
                      alt="SP AI"
                        width={160}
                        height={80}
                        className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-20 bg-background-light dark:bg-background-dark">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
                  Event <span className="text-primary-light dark:text-primary-dark">Gallery</span>
                </h2>
                {/* Use secondary color for underline */}
                <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
                <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
                  A glimpse into our vibrant community events and activities.
                </p>
              </div>

              <div className="space-y-8">
                {/* Carousel 1: Left to Right */}
                <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
                  <div className="flex marquee-content-ltr whitespace-nowrap"> {/* Changed class */} 
                    {[
                      "/gallery/yac2.png",
                      "/gallery/syaigathering3.png",
                      "/gallery/mindfulhacksxsyai2.png",
                      "/gallery/deepracedash2.png",
                      "/gallery/yac2.png", // Repeat for seamless loop
                      "/gallery/syaigathering3.png",
                      "/gallery/mindfulhacksxsyai2.png",
                      "/gallery/deepracedash2.png",
                    ].map((src, index) => (
                      <div key={`ltr-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image src={src} alt={`Gallery image ${index + 1}`} width={400} height={300} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel 2: Right to Left */}
                <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
                  <div className="flex marquee-content-rtl whitespace-nowrap"> {/* Changed class */} 
                    {[
                      "/gallery/yac.png",
                      "/gallery/syaigathering2.png",
                      "/gallery/mindfulhacksxsyai.png",
                      "/gallery/deepracedash3.png",
                      "/gallery/yac.png", // Repeat for seamless loop
                      "/gallery/syaigathering2.png",
                      "/gallery/mindfulhacksxsyai.png",
                      "/gallery/deepracedash3.png",
                    ].map((src, index) => (
                      <div key={`rtl-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image src={src} alt={`Gallery image ${index + 1}`} width={400} height={300} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel 3: Left to Right */}
                <div className="overflow-hidden w-full"> {/* Keep overflow-hidden for clipping and hover target */}
                  <div className="flex marquee-content-ltr whitespace-nowrap"> {/* Changed class */} 
                    {[
                      "/gallery/syaigathering1.png",
                      "/gallery/deepracedash1.png",
                      "/gallery/cedar2.png",
                      "/gallery/cedar1.png",
                      "/gallery/syaigathering1.png", // Repeat for seamless loop
                      "/gallery/deepracedash1.png",
                      "/gallery/cedar2.png",
                      "/gallery/cedar1.png",
                    ].map((src, index) => (
                      <div key={`ltr2-${index}`} className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 p-2">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                          <Image src={src} alt={`Gallery image ${index + 1}`} width={400} height={300} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
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
