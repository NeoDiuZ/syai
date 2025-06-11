"use client";

import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Briefcase, Zap, Award, Users, Target, Mail, CheckCircle, XCircle, ChevronRight, MessageSquare, Brain, Lightbulb } from 'lucide-react'; // Added icons

// Button component - can be enhanced further if needed
const Button = ({ href, children, mailto, className, variant = 'primary' }) => {
  const commonClasses = "inline-block px-8 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let variantClasses = "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:opacity-90 animate-gradient-x focus:ring-purple-500"; // Default primary
  if (variant === 'secondary') {
    variantClasses = "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 animate-gradient-x focus:ring-red-500"; // Example secondary
  }

  const finalClasses = `${commonClasses} ${variantClasses} ${className || ''}`;

  if (mailto) {
    return (
      <a href={mailto} className={finalClasses}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} legacyBehavior>
      <a className={finalClasses}>{children}</a>
    </Link>
  );
};

const SectionTitle = ({ children, icon: IconComponent }) => (
  <div className="flex items-center justify-center mb-10 md:mb-12">
    {IconComponent && <IconComponent className="w-8 h-8 md:w-10 md:h-10 mr-3 text-primary-light dark:text-primary-dark" />}
    <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark">
      {children}
    </h2>
  </div>
);

const SubSectionCard = ({ title, content, icon: IconComponent, animationClass }) => (
  <div className={`bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${animationClass || ''}`}>
    {IconComponent && <IconComponent className="w-10 h-10 mb-4 text-primary-light dark:text-primary-dark" />}
    <h3 className="text-xl md:text-2xl font-semibold text-text-light dark:text-text-dark mb-3">{title}</h3>
    <p className="text-text-light dark:text-text-dark opacity-80 text-sm md:text-base leading-relaxed">{content}</p>
  </div>
);

// NEW EnquiryForm component
const EnquiryForm = ({ aisyahEmail, aisyahSubject }) => {
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        console.error("API Error Response:", errorResult);
        throw new Error(errorResult.message || 'Network response was not ok');
      }
      
      setSubmitStatus('success');
      setFormData({ schoolName: '', contactPerson: '', email: '', message: '' });
    } catch (error) {
      console.error("Failed to send enquiry:", error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-12 md:py-16 bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl mt-12 md:mt-20 animate__animated animate__fadeInUp">
      <div className="flex items-center justify-center mb-8 md:mb-10">
        <Mail className="w-8 h-8 md:w-10 md:h-10 mr-3 text-primary-light dark:text-primary-dark" />
        <h3 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">
          Enquire About SYAI Inspire
        </h3>
      </div>
      
      <div className="max-w-2xl mx-auto px-6">
        {submitStatus === 'success' && (
          <div className="flex items-center mb-6 p-4 text-green-700 bg-green-100 dark:bg-green-700/20 dark:text-green-300 rounded-md shadow-md animate__animated animate__fadeIn">
            <CheckCircle className="w-6 h-6 mr-3" /> 
            <span>Thank you! Your enquiry has been sent. We&apos;ll be in touch soon.</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center mb-6 p-4 text-red-700 bg-red-100 dark:bg-red-700/20 dark:text-red-300 rounded-md shadow-md animate__animated animate__fadeIn">
            <XCircle className="w-6 h-6 mr-3" />
            <span>Oops! Something went wrong. Please try again or email us directly at <a href={`mailto:${aisyahEmail}`} className="underline font-semibold">{aisyahEmail}</a>.</span>
          </div>
        )}
        {(!submitStatus || submitStatus === 'error') && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="schoolName" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">School Name*</label>
              <input type="text" name="schoolName" id="schoolName" value={formData.schoolName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-light focus:border-primary-light dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" placeholder="e.g., Springfield Secondary School" />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Contact Person*</label>
              <input type="text" name="contactPerson" id="contactPerson" value={formData.contactPerson} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-light focus:border-primary-light dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" placeholder="e.g., Ms. Tan" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Your Email Address*</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-light focus:border-primary-light dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" placeholder="e.g., mstan@school.edu.sg" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1">Message / Specific Requirements</label>
              <textarea name="message" id="message" rows="4" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-primary-light focus:border-primary-light dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors" placeholder="Let us know if you have any preferred dates, number of students, or specific topics of interest!"></textarea>
            </div>
            <div className="text-center pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="animated-gradient-button w-full md:w-auto inline-flex items-center justify-center px-10 py-3 rounded-lg text-lg font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Send Enquiry'}
                {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
              </button>
            </div>
            <p className="text-center text-xs text-text-light dark:text-text-dark opacity-70 pt-2">
              Alternatively, you can email us directly at <a href={`mailto:${aisyahEmail}?subject=${encodeURIComponent(aisyahSubject)}`} className="text-primary-light dark:text-primary-dark hover:underline">{aisyahEmail}</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default function SecondarySchoolEngagementsPage() {
  const email = "hello@sgyouthai.org";
  const subject = "Enquiry: SYAI Inspire for <Name of School>";
  // const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`; // Not used directly by form anymore

  return (
    <>
      <Head>
        <title>Ignite AI Enthusiasm | Secondary School Engagements | SYAI</title>
        <meta name="description" content="Discover SYAI's dynamic AI workshops and assembly talks for secondary schools. Spark curiosity and equip students with future-ready AI skills." />
      </Head>

      {/* Removed default main background from here, applying to sections directly for more control */}
      <main className="text-text-light dark:text-text-dark py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <header className="text-center mb-16 md:mb-20 animate__animated animate__fadeInDown">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-foreground">
                Spark Curiosity,
              </span>
              <span className="block mt-2 md:mt-3 text-text-light dark:text-text-dark">
                Ignite AI Potential in Schools
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-light dark:text-text-dark opacity-90 max-w-3xl mx-auto">
              SYAI brings AI to life for secondary school students! Our engaging workshops and inspiring assembly talks are designed to demystify Artificial Intelligence and empower the next generation of innovators.
            </p>
          </header>

          {/* Why AI Sharings/Workshops? */}
          <section className="mb-16 md:mb-24 py-12 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg animate__animated animate__fadeInUp">
            <SectionTitle icon={Lightbulb}>Why Our AI Engagements?</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-6 md:px-10">
              <SubSectionCard 
                icon={Zap}
                title="Future-Ready Skills" 
                content="We introduce AI as a pivotal skill for Singapore's Smart Nation future. Early, exciting exposure makes all the difference!"
                animationClass="animate__animated animate__fadeInUp animate__delay-1s"
              />
              <SubSectionCard 
                icon={Brain} 
                title="Ethical & Critical Thinking"
                content="Students explore AI's societal impact and ethical dimensions, fostering a responsible and thoughtful approach to technology."
                animationClass="animate__animated animate__fadeInUp animate__delay-2s hover:animate-subtle-pulse"
              />
              <SubSectionCard 
                icon={Award}
                title="Engaging & Accessible"
                content="Our fun, beginner-friendly sessions spark curiosity and build confidence, making complex AI concepts easy to grasp and exciting to learn."
                animationClass="animate__animated animate__fadeInUp animate__delay-3s"
              />
            </div>
          </section>

          {/* Assembly Talks Section */}
          <section className="mb-16 md:mb-24 py-12 bg-background-light dark:bg-gray-800/30 rounded-xl shadow-xl animate__animated animate__fadeInUp">
            <div className="text-center mb-10 md:mb-12 px-6">
                 <Image src="/SYAI_Inspire_Assembly.png" alt="SYAI Assembly Talk" width={700} height={400} className="rounded-lg mx-auto shadow-2xl border-4 border-surface-light dark:border-surface-dark hover:animate-subtle-pulse" />
            </div>
            <SectionTitle icon={Briefcase}>Assembly Talks: Inspire & Inform</SectionTitle>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 px-6 md:px-10">
              <div className="bg-surface-light dark:bg-surface-dark/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Overview</h3>
                <p className="text-text-light dark:text-text-dark opacity-80">A large-scale, cohort-wide learning experience designed to ignite students&apos; passion for AI and its possibilities.</p>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Duration</h3>
                <p className="text-text-light dark:text-text-dark opacity-80">1 - 1.5 Hours (Flexible to suit your schedule)</p>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark/70 p-6 rounded-lg md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Target Group</h3>
                <p className="text-text-light dark:text-text-dark opacity-80">Ideal for large student groups, adaptable for specific cohorts or mixed year levels.</p>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark/70 p-6 rounded-lg md:col-span-2 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">Core Content</h3>
                <ul className="list-none space-y-3 text-text-light dark:text-text-dark opacity-80">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 mr-2 mt-1 text-secondary-light dark:text-secondary-dark flex-shrink-0" />
                    <span><strong>AI Sharing Session:</strong> Delivered by our passionate Youth AI Speakers, covering foundational AI, career paths, ethical considerations, and responsible AI use.</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 mr-2 mt-1 text-secondary-light dark:text-secondary-dark flex-shrink-0" />
                    <span><strong>Interactive Fireside Chat:</strong> Engaging Q&A to deepen understanding and encourage critical discussion about AI&apos;s role in their future.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What We Recommend Section */}
          <section className="mb-16 md:mb-24 py-12 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg animate__animated animate__fadeInUp">
            <SectionTitle icon={Target}>Our Recommendation</SectionTitle>
            <div className="bg-primary-light/10 dark:bg-primary-dark/10 p-8 md:p-10 rounded-xl shadow-inner max-w-3xl mx-auto text-center border border-primary-light/30 dark:border-primary-dark/30">
              <Users className="w-12 h-12 text-primary-light dark:text-primary-dark mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Ideal For: Secondary 3 Students</h3>
              <p className="text-text-light dark:text-text-dark opacity-80 mb-3">
                Sec 3 is a great time for students to explore AI for EAE applications and future pathways. However, our programs are flexible and can be tailored for other levels based on your school&apos;s specific needs and goals.
              </p>
            </div>
          </section>

          {/* How to Get Started Section */}
          <section className="mb-12 md:mb-20 py-12 animate__animated animate__fadeInUp">
            <SectionTitle icon={MessageSquare}>Easy Steps to Get Started</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-6 md:px-0">
              {[ // Array for step data
                { num: 1, title: "Schedule & Requirements", desc: "Chat with us to finalize a date, time, and confirm basic technical needs (venue, projector, Wi-Fi).", bgColor: "bg-blue-500", animationDelay: "animate__delay-1s" },
                { num: 2, title: "We Handle The Rest", desc: "SYAI provides all necessary materials and ensures a seamless, engaging session for your students.", bgColor: "bg-purple-500", animationDelay: "animate__delay-2s" },
                { num: 3, title: "Reach Out Today!", desc: "Connect via the form below or email us. Let's inspire your students together!", bgColor: "bg-pink-500", animationDelay: "animate__delay-3s" },
              ].map((step) => (
                <div key={step.num} className={`bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate__animated animate__fadeInUp ${step.animationDelay} hover:animate-subtle-pulse`}>
                  <div className={`text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-5 shadow-md ${step.bgColor}`}>{step.num}</div>
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">{step.title}</h3>
                  <p className="text-text-light dark:text-text-dark opacity-80 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <EnquiryForm aisyahEmail={email} aisyahSubject={subject} />

        </div>
      </main>
    </>
  );
} 