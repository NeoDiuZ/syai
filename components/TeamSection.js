import { promises as fs } from 'fs';
import path from 'path';
import { Linkedin } from 'lucide-react';
import Link from 'next/link';

async function getTeamData() {
    // This URL construction will work for both local development and Vercel deployments.
    const apiUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/admin/team`
        : 'http://localhost:3000/api/admin/team';

    try {
        // Use { cache: 'no-store' } to ensure fresh data on every request,
        // which is essential for seeing updates from the admin panel immediately.
        const res = await fetch(apiUrl, { cache: 'no-store' });

        if (!res.ok) {
            console.error(`API fetch failed with status: ${res.status}. Falling back to local file.`);
            // This fallback is crucial for the initial build on Vercel (when services are not yet running)
            // and for resilience during local development.
            const fileContents = await fs.readFile(path.join(process.cwd(), 'data/team.json'), 'utf8');
            return JSON.parse(fileContents);
        }

        return await res.json();
    } catch (error) {
        console.error("Could not fetch team data, falling back to local file:", error);
        try {
            const fileContents = await fs.readFile(path.join(process.cwd(), 'data/team.json'), 'utf8');
            return JSON.parse(fileContents);
        } catch (fileError) {
            console.error("Could not read local fallback file:", fileError);
            return [];
        }
    }
}

export default async function TeamSection() {
    const teamMembers = await getTeamData();

    const boardMembers = teamMembers.filter(m => ["Director & President", "Co-Founder", "Vice President", "Treasurer", "Secretary"].includes(m.role));
    const executiveCommittee = teamMembers.filter(m => ["Head of SYAI Inspire", "Head of SYAI Monthly Meetups"].includes(m.role));
    const subcommittee = teamMembers.filter(m => !boardMembers.includes(m) && !executiveCommittee.includes(m));
  
    return (
      <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold animate-fadeInSlideUp">
              Our <span className="text-primary-light dark:text-primary-dark">Team</span>
            </h2>
            <div className="mt-2 h-1 w-20 bg-secondary-light dark:bg-secondary-dark mx-auto"></div>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-text-light/80 dark:text-text-dark/80">
              Meet the passionate individuals behind SYAI who are working together to build a community
              of AI enthusiasts and create innovative solutions.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Board Members Section - Top of Tree */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Board <span className="text-primary-light dark:text-primary-dark">Members</span>
              </h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl">
                  {boardMembers.map((member, index) => (
                    <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm">{member.name}</h3>
                        <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                        <a 
                          href={member.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                        >
                          <Linkedin className="mr-1 h-4 w-4" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Executive Committee Section - Second Level */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Executive <span className="text-primary-light dark:text-primary-dark">Committee</span>
              </h3>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl">
                  {executiveCommittee.map((member, index) => (
                    <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-sm">{member.name}</h3>
                        <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                        <a 
                          href={member.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                        >
                          <Linkedin className="mr-1 h-4 w-4" />
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Subcommittee Section - Bottom Level */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Sub<span className="text-primary-light dark:text-primary-dark">committee</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {subcommittee.map((member, index) => (
                  <div key={index} className="bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] hover:border-primary-light dark:hover:border-primary-dark border border-transparent">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm">{member.name}</h3>
                      <p className="text-primary-light dark:text-primary-dark text-xs mb-1">{member.role}</p>
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors"
                      >
                        <Linkedin className="mr-1 h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="mt-10 text-center">
            <Link
              href="#https://forms.gle/VKgYwhSoB9dChtct8"
              className="rounded-lg px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center relative overflow-hidden group animate-gradient-x"
            >
              <span className="relative z-10">Join Our Team</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  } 