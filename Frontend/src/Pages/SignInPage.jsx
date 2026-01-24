import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Update with your actual logo path
import logo from "../../public/AthenuraLogo.png"; 

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [userCaptcha, setUserCaptcha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Generate captcha
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptcha({ a, b });
    setUserCaptcha("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // API call for sign in
  const signInAPI = async (email, password) => {
    try {
      const response = await axios.post(
        `/api/login`,
        {
          email: email.trim().toLowerCase(),
          password: password,
        },
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Sign in failed");
      } else if (error.request) {
        throw new Error("Network error. Please check your connection.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate CAPTCHA
    if (parseInt(userCaptcha) !== captcha.a + captcha.b) {
      setError("Incorrect CAPTCHA answer. Try again.");
      generateCaptcha();
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await signInAPI(email, password);
      
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      navigate("/dashboard", { 
        state: { message: "Login successful!" } 
      });
      
    } catch (err) {
      setError(err.message);
      generateCaptcha(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 font-sans">
      
      {/* Styles for animations */}
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
        .animate-fade-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-[#50B4C6]/20 overflow-hidden border border-white animate-fade-up">

        {/* Left Side — Info Section */}
        <div className="relative md:w-1/2 bg-[#50B4C6] flex flex-col justify-between p-10 text-white overflow-hidden">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-600/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-black/10"></div>

          {/* Logo & Home Link */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white p-2 rounded-xl backdrop-blur-sm">
                <img
                  src={logo}
                  alt="Athenura Logo"
                  className="h-8 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Text Section */}
          <div className="relative z-10 my-12 md:my-0 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Welcome to the <br/>
              <span className="text-cyan-100">Intern Portal</span>
            </h1>
            <p className="text-cyan-50 text-lg leading-relaxed max-w-sm">
              Track your progress, manage reports, and accelerate your career growth with Athenura.
            </p>
          </div>

          {/* Footer Text */}
          <div className="relative z-10 text-xs text-cyan-100/60 hidden md:block">
            © {new Date().getFullYear()} Athenura India Pvt Ltd.
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:p-12">
          <div className="max-w-md mx-auto w-full">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-500 mb-8">Please enter your details to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-focus-within:text-[#50B4C6] transition-colors">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all duration-200 text-gray-800"
                    placeholder="john@example.com"
                    required
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </span>
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1 group-focus-within:text-[#50B4C6] transition-colors">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all duration-200 text-gray-800"
                    placeholder="••••••••"
                    required
                  />
                  <span className="absolute right-4 top-3.5 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </span>
                </div>
              </div>

              {/* CAPTCHA */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Security Check</label>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 font-mono text-lg font-bold text-gray-600 tracking-widest select-none">
                    {captcha.a} + {captcha.b} = ?
                  </div>
                  <input
                    type="number"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    placeholder="Ans"
                    className="w-20 px-3 py-2 rounded-lg border border-gray-200 focus:border-[#50B4C6] focus:ring-2 focus:ring-[#50B4C6]/20 outline-none text-center font-bold text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 text-gray-400 hover:text-[#50B4C6] hover:bg-white hover:shadow-sm rounded-full transition-all"
                    title="Refresh Captcha"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg text-sm animate-fade-up">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#50B4C6] hover:bg-[#3ea0b2] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-[#50B4C6]/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#50B4C6] font-bold hover:text-[#3ea0b2] transition-colors relative group"
                  >
                    Create Account
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3ea0b2] transition-all group-hover:w-full"></span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;