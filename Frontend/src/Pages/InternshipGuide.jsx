import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../public/AthenuraLogo.png"; 

export default function AthenuraTerms() {
  const [activeSection, setActiveSection] = useState("acceptance");

  // Data structure for the Sidebar to auto-generate links
  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "use-of-service", title: "3. Use of Services" },
    { id: "responsibilities", title: "4. User Responsibilities" },
    { id: "internship-programs", title: "5. Internship Programs" },
    { id: "offer-letter", title: "6. Offer Letter" },
    { id: "roles", title: "7. Roles & Conduct" },
    { id: "ip", title: "8. Intellectual Property" },
    { id: "confidentiality", title: "9. Confidentiality" },
    { id: "certificate", title: "10. Internship Certificate" },
    { id: "outcomes", title: "11. No Guarantee" },
    { id: "liability", title: "12. Limitation of Liability" },
    { id: "indemnification", title: "13. Indemnification" },
    { id: "termination", title: "14. Termination" },
    { id: "links", title: "15. Third-Party Links" },
    { id: "law", title: "16. Governing Law" },
    { id: "changes", title: "17. Changes to Terms" },
    { id: "contact", title: "18. Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 text-gray-800 scroll-smooth selection:bg-[#50B4C6] selection:text-white font-sans">
      
      {/* Styles for Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        
        /* Custom Scrollbar for Sidebar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #50B4C6; border-radius: 4px; }
      `}</style>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#50B4C6]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="Athenura Logo" className="w-32 h-auto object-contain" />
          </Link>
          <div className="flex space-x-4">
            <Link to="/signup" className="px-6 py-2 font-semibold border-2 border-[#50B4C6] text-[#50B4C6] rounded-full hover:bg-[#50B4C6] hover:text-white transition-all duration-300">
              Sign In
            </Link>
            <Link to="/register" className="px-6 py-2 font-semibold bg-[#50B4C6] text-white rounded-full hover:bg-[#3ea0b2] hover:shadow-[0_0_15px_rgba(80,180,198,0.5)] transition-all duration-300 shadow-md">
              Register
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Terms and <span className="text-[#50B4C6]">Conditions</span>
            </h1>
            <p className="text-gray-500 max-w-3xl mx-auto text-lg">
              Please read these terms carefully before participating in Athenura’s programs.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation (Sticky) */}
            <div className="lg:w-80 flex-shrink-0 animate-fade-up delay-100">
              <div className="sticky top-32 bg-white rounded-2xl shadow-xl shadow-gray-100 border border-[#50B4C6]/20 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#50B4C6]/10 rounded-bl-full -mr-4 -mt-4"></div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg relative z-10">Table of Contents</h3>
                <nav className="space-y-1 relative z-10 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                        activeSection === section.id
                          ? 'bg-[#50B4C6] text-white shadow-md shadow-[#50B4C6]/30 translate-x-1'
                          : 'text-gray-600 hover:bg-cyan-50 hover:text-[#50B4C6]'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 animate-fade-up delay-200">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 md:p-12 relative overflow-hidden">
                
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#50B4C6]">
                  
                  {/* 1. Acceptance */}
                  <section id="acceptance" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">1</span>
                      Acceptance of Terms
                    </h2>
                    <p className="text-gray-700">
                      By accessing, browsing, registering, or using Athenura’s website, services, programs, platforms, or communications, you acknowledge that you have read, understood, and agree to be legally bound by these Terms & Conditions. If you do not agree to any part of these Terms, you must immediately discontinue use of Athenura’s services.
                    </p>
                  </section>

                  {/* 2. Eligibility */}
                  <section id="eligibility" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">2</span>
                      Eligibility
                    </h2>
                    <p className="text-gray-700">
                      You must be legally capable of entering into a binding agreement to use Athenura’s services. Internship opportunities are open to students, graduates, or individuals who meet the eligibility criteria defined by Athenura. Submission of an application does not guarantee selection or participation.
                    </p>
                  </section>

                  {/* 3. Use of Website */}
                  <section id="use-of-service" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">3</span>
                      Use of Website and Services
                    </h2>
                    <ul className="list-none space-y-3">
                      {[
                        "Use the website, platforms, and services only for lawful and legitimate purposes.",
                        "Do not interfere with, disrupt, damage, or attempt unauthorized access to systems, servers, or data.",
                        "Do not submit false, misleading, inaccurate, or fraudulent information.",
                        "Do not misuse content, communication channels, or company resources."
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                          <span className="text-[#50B4C6] font-bold mr-3">{idx + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* 4. User Responsibilities */}
                  <section id="responsibilities" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">4</span>
                      User Responsibilities
                    </h2>
                    <p className="text-gray-700">
                      You are responsible for maintaining the accuracy of information provided to Athenura and for safeguarding any login credentials or communication details. Athenura shall not be responsible for losses resulting from inaccurate information, misuse, or unauthorized access caused by user negligence.
                    </p>
                  </section>

                  {/* 5. Internship Programs */}
                  <section id="internship-programs" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">5</span>
                      Internship Programs and Services
                    </h2>
                    <p className="text-gray-700">
                      Athenura offers internship programs for educational and skill-development purposes only. Participation is subject to selection criteria, availability, and compliance with company policies. Internship programs do not constitute employment and do not guarantee future job placement or compensation unless explicitly stated in writing.
                    </p>
                  </section>

                  {/* 6. Offer Letter */}
                  <section id="offer-letter" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">6</span>
                      Internship Offer Letter
                    </h2>
                    <p className="text-gray-700">
                      An official Internship Offer Letter will be issued only to selected candidates after successful application review and confirmation. The offer letter outlines internship duration, role, responsibilities, and applicable terms. Athenura reserves the right to withdraw or modify an internship offer at any stage in case of misinformation, policy violation, or operational requirements.
                    </p>
                  </section>

                  {/* 7. Roles */}
                  <section id="roles" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">7</span>
                      Roles, Conduct, and Performance
                    </h2>
                    <p className="text-gray-700">
                      Interns are expected to perform assigned tasks responsibly, meet deadlines, follow instructions, and maintain professional conduct. Any form of misconduct, non-compliance, absenteeism, unethical behavior, or misuse of company resources may result in termination of the internship without prior notice.
                    </p>
                  </section>

                  {/* 8. IP */}
                  <section id="ip" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">8</span>
                      Intellectual Property Rights
                    </h2>
                    <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                      <p className="text-gray-700">
                        All content, software, documentation, designs, source code, training materials, and work products created or accessed during internships or services remain the exclusive intellectual property of Athenura. Users and interns may not copy, distribute, publish, or reuse such materials without prior written authorization.
                      </p>
                    </div>
                  </section>

                  {/* 9. Confidentiality */}
                  <section id="confidentiality" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">9</span>
                      Confidentiality
                    </h2>
                    <p className="text-gray-700">
                      All non-public, proprietary, or sensitive information disclosed during programs, internships, or communications must be kept strictly confidential. This obligation continues even after completion or termination of services or internships.
                    </p>
                  </section>

                  {/* 10. Certificate */}
                  <section id="certificate" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">10</span>
                      Internship Certificate
                    </h2>
                    <p className="text-gray-700">
                      An Internship Completion Certificate is issued only upon successful completion of the internship duration, satisfactory performance, compliance with all policies, and submission of required work or evaluations. Athenura reserves the right to withhold or revoke certificates in cases of misconduct, incomplete participation, or policy violations.
                    </p>
                  </section>

                  {/* 11. Outcomes */}
                  <section id="outcomes" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">11</span>
                      No Guarantee of Outcomes
                    </h2>
                    <p className="text-gray-700">
                      Athenura does not guarantee employment, job placement, stipend, salary, or financial benefits as a result of participation in any internship or service unless explicitly confirmed in writing.
                    </p>
                  </section>

                  {/* 12. Liability */}
                  <section id="liability" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">12</span>
                      Limitation of Liability
                    </h2>
                    <p className="text-gray-700">
                      To the maximum extent permitted by law, Athenura shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use or inability to use its website, services, programs, or internship offerings.
                    </p>
                  </section>

                  {/* 13. Indemnification */}
                  <section id="indemnification" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">13</span>
                      Indemnification
                    </h2>
                    <p className="text-gray-700">
                      You agree to indemnify and hold harmless Athenura, its directors, employees, mentors, and affiliates from any claims, damages, losses, or expenses arising from your violation of these Terms or misuse of services.
                    </p>
                  </section>

                  {/* 14. Termination */}
                  <section id="termination" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">14</span>
                      Termination of Access or Internship
                    </h2>
                    <p className="text-gray-700">
                      Athenura reserves the right to suspend or terminate access to services or terminate an internship at any time without prior notice in cases of policy violation, misconduct, false information, or security risks.
                    </p>
                  </section>

                  {/* 15. Third-Party Links */}
                  <section id="links" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">15</span>
                      Third-Party Links
                    </h2>
                    <p className="text-gray-700">
                      The website may contain links to third-party platforms or resources. Athenura does not control and is not responsible for the content, availability, or practices of such external sites.
                    </p>
                  </section>

                  {/* 16. Law */}
                  <section id="law" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">16</span>
                      Governing Law and Jurisdiction
                    </h2>
                    <p className="text-gray-700">
                      These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall fall under the exclusive jurisdiction of the courts of India.
                    </p>
                  </section>

                  {/* 17. Changes */}
                  <section id="changes" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">17</span>
                      Changes to Terms
                    </h2>
                    <p className="text-gray-700">
                      Athenura reserves the right to update, amend, or modify these Terms & Conditions at any time. Continued use of the website or participation in services or internships constitutes acceptance of the revised Terms.
                    </p>
                  </section>

                  {/* 18. Contact */}
                  <section id="contact" className="scroll-mt-32 mb-10">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-[#50B4C6]/20 flex items-center">
                      <span className="bg-[#50B4C6] text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm mr-3">18</span>
                      Contact Information
                    </h2>
                    <div className="bg-[#50B4C6]/10 p-6 rounded-xl border border-[#50B4C6]/30">
                      <p className="text-gray-700 mb-2">
                        For any questions, clarifications, or concerns regarding these Terms & Conditions, please contact us at:
                      </p>
                      <a 
                        href="mailto:info.athenura@gmail.com" 
                        className="text-xl font-bold text-[#50B4C6] hover:underline"
                      >
                        info.athenura@gmail.com
                      </a>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t-4 border-[#50B4C6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
               <img src={logo} alt="Athenura Logo" className="w-28 h-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex space-x-6 text-sm font-medium">
              <Link to="/signup" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Sign In</Link>
              <Link to="/register" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Register</Link>
              <Link to="/feedback" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Feedback</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Athenura India Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}