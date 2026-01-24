import React from "react";
import { Link } from "react-router-dom";
// Make sure to replace this with your actual Athenura logo path
import logo from "../../public/AthenuraLogo.png"; 

export default function AthenuraPage() {
  // Custom Color: #50B4C6
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 text-gray-800 scroll-smooth font-sans selection:bg-[#50B4C6] selection:text-white">
      
      {/* Inline Styles for Custom Animations to keep it dependency-free */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-[#50B4C6]/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <img
              src={logo}
              alt="Athenura Logo"
              className="w-32 h-auto object-contain"
            />
          </div>

          {/* Auth Buttons */}
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="px-6 py-2 font-semibold border-2 border-[#50B4C6] text-[#50B4C6] rounded-full hover:bg-[#50B4C6] hover:text-white transition-all duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 font-semibold bg-[#50B4C6] text-white rounded-full hover:bg-[#3ea0b2] hover:shadow-[0_0_15px_rgba(80,180,198,0.5)] transition-all duration-300 shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24 relative overflow-hidden"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#50B4C6]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          
          <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Welcome to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50B4C6] to-cyan-600">
              Athenura Internship
            </span>
          </h1>
          
          <p className="animate-fade-up delay-200 text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Empower your career with real-world experience. Share your journey, 
            gain insights, and help shape the future of technology at Athenura.
          </p>
          
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/feedback"
              className="bg-[#50B4C6] text-white px-8 py-4 text-lg font-bold rounded-xl hover:bg-[#3ea0b2] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#50B4C6]/40"
            >
              Submit Feedback
            </Link>
            <Link
              to="/terms"
              className="group bg-white text-[#50B4C6] border-2 border-[#50B4C6] px-8 py-4 text-lg font-bold rounded-xl hover:bg-[#50B4C6] hover:text-white transition-all duration-300"
            >
              Program Details
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 animate-fade-up">
            Why Your Feedback Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group animate-float delay-100 text-center p-8 rounded-2xl bg-cyan-50/50 hover:bg-white transition-all duration-500 border border-transparent hover:border-[#50B4C6]/30 hover:shadow-2xl hover:shadow-cyan-100/50">
              <div className="w-16 h-16 bg-[#50B4C6] rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#50B4C6]/30">
                <span className="text-white text-3xl -rotate-3 group-hover:-rotate-6 transition-transform">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Project Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Document your contributions to live projects and showcase the technologies you mastered.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group animate-float delay-200 text-center p-8 rounded-2xl bg-cyan-50/50 hover:bg-white transition-all duration-500 border border-transparent hover:border-[#50B4C6]/30 hover:shadow-2xl hover:shadow-cyan-100/50">
              <div className="w-16 h-16 bg-cyan-600 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-600/30">
                <span className="text-white text-3xl rotate-3 group-hover:rotate-6 transition-transform">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mentorship
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Evaluate the guidance you received to help us improve our mentorship quality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group animate-float delay-300 text-center p-8 rounded-2xl bg-cyan-50/50 hover:bg-white transition-all duration-500 border border-transparent hover:border-[#50B4C6]/30 hover:shadow-2xl hover:shadow-cyan-100/50">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
                <span className="text-white text-3xl -rotate-3 group-hover:-rotate-6 transition-transform">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Growth Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize your skill acquisition and career readiness progression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Program Section */}
      <section id="internship" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Athenura Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A hands-on journey into modern software engineering, designed to transform potential into professional excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Program Highlights</h3>
              {[
                "Live Production Environment",
                "Cutting-edge Tech Stack (MERN/Next.js)",
                "Weekly Code Reviews & Workshops"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="w-8 h-8 bg-[#50B4C6] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#50B4C6]/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#50B4C6]/10 rounded-bl-full transition-all duration-500 group-hover:scale-150"></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Current Interns</h3>
              <p className="text-gray-600 mb-8 relative z-10">
                Already part of the team? Submit your weekly feedback or view your progress report.
              </p>
              
              <div className="space-y-4 relative z-10">
                <Link
                  to="/feedback"
                  className="block w-full bg-[#50B4C6] text-white text-center py-4 rounded-xl hover:bg-[#3ea0b2] transition-all duration-300 font-bold shadow-lg hover:shadow-[#50B4C6]/30"
                >
                  Access Feedback Portal
                </Link>
                <Link
                  to="/resources"
                  className="block w-full border-2 border-gray-200 text-gray-600 text-center py-4 rounded-xl hover:border-[#50B4C6] hover:text-[#50B4C6] transition-all duration-300 font-semibold"
                >
                  View Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#50B4C6] relative overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl mb-10 text-cyan-50">
            Join the Athenura internship program and build the skills that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-[#50B4C6] px-10 py-4 text-lg font-bold rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Apply Now
            </Link>
            <Link
              to="/feedback"
              className="border-2 border-white text-white px-10 py-4 text-lg font-bold rounded-xl hover:bg-white hover:text-[#50B4C6] transition-all duration-300"
            >
              Current Intern Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t-4 border-[#50B4C6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img
                src={logo}
                alt="Athenura Logo"
                className="w-28 h-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex space-x-8 font-medium">
              <Link to="/about" className="text-gray-400 hover:text-[#50B4C6] transition-colors">About</Link>
              <Link to="/careers" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Careers</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Privacy</Link>
              <Link to="/contact" className="text-gray-400 hover:text-[#50B4C6] transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Athenura. All rights reserved. <br/>
              <span className="text-[#50B4C6]">Innovating for tomorrow.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}