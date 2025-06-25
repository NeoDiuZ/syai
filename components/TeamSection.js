import { Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

async function getTeamData() {
    // Fetch data from the API endpoint instead of the local file.
    // This ensures we always get the latest data from the database.
    try {
        // The NEXT_PUBLIC_BASE_URL should be set in your Vercel environment variables.
        // For local development, it would be 'http://localhost:3000'.
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/team`, { cache: 'no-store' });

        if (!res.ok) {
            console.error("Failed to fetch team data from API");
            return [];
        }

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error("Could not fetch team data:", error);
        return [];
    }
}

function TeamMemberCard({ member }) {
    return (
        <div className="w-56 glass-card glass-hover rounded-lg overflow-hidden transition-all duration-300 flex flex-col">
            <div className="aspect-square relative overflow-hidden">
                <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={224}
                    height={224}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="glass-content p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-sm h-10">{member.name}</h3>
                    <p className="text-primary-light dark:text-primary-dark text-xs">{member.role}</p>
                </div>
                <a
                    href={member.linkedinurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-light/60 dark:text-text-dark/60 hover:text-primary-light dark:hover:text-primary-dark inline-flex items-center text-xs transition-colors mt-2"
                >
                    <Linkedin className="mr-1 h-4 w-4" />
                    LinkedIn
                </a>
            </div>
        </div>
    );
}

export default async function TeamSection() {
    const teamMembers = await getTeamData();

    const boardMembers = teamMembers
        .filter(m => m.group === 'Board Members')
        .sort((a, b) => a.display_order - b.display_order);

    const executiveCommittee = teamMembers
        .filter(m => m.group === 'Executive Committee')
        .sort((a, b) => a.display_order - b.display_order);

    const subcommittee = teamMembers
        .filter(m => m.group === 'Subcommittee')
        .sort((a, b) => a.display_order - b.display_order);

    return (
      <section id="team" className="w-full py-12 md:py-24 lg:py-32">
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

          <div>
            {/* Board Members Section - Top of Tree */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Board <span className="text-primary-light dark:text-primary-dark">Members</span>
              </h3>
              <div className="flex flex-wrap gap-8 justify-center">
                  {boardMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
              </div>
            </div>

            {/* Executive Committee Section - Second Level */}
            <div className="mb-20">
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Executive <span className="text-primary-light dark:text-primary-dark">Committee</span>
              </h3>
              <div className="flex flex-wrap gap-8 justify-center">
                  {executiveCommittee.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
              </div>
            </div>

            {/* Subcommittee Section - Bottom Level */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-center mb-12 animate-fadeInSlideUp">
                Sub<span className="text-primary-light dark:text-primary-dark">committee</span>
              </h3>
              <div className="flex flex-wrap gap-8 justify-center">
                {subcommittee.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="https://forms.gle/VKgYwhSoB9dChtct8"
              className="animated-gradient-button rounded-lg px-6 py-3 text-white font-semibold inline-flex items-center"
            >
              Join Our Team
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }
