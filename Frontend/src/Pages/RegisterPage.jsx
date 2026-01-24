import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Key, 
  Lock,
  ArrowRight
} from "lucide-react";
// Ensure you have your logo in the public folder
import logo from "../../public/AthenuraLogo.png"; 

const RegistrationPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    secretKey: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/register", form);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
          navigate("/signup");
      }, 2000);
      setForm({
        fullName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        secretKey: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-4 font-sans">
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-[85vh] bg-white rounded-3xl shadow-2xl shadow-[#50B4C6]/20 overflow-hidden border border-white animate-fade-up">

        {/* Left Panel — Brand/Info */}
        <div className="relative md:w-5/12 bg-[#50B4C6] flex flex-col justify-between p-10 text-white overflow-hidden shrink-0">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-600/20 rounded-full blur-2xl -ml-12 -mb-12"></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-cyan-300/20 rounded-full blur-xl"></div>

          {/* Logo */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="bg-white p-2 rounded-xl backdrop-blur-sm ">
                <img
                  src={logo}
                  alt="Athenura Logo"
                  className="h-8 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Center Text */}
          <div className="relative z-10 flex flex-col justify-center h-full mt-8 md:mt-0">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Create Your <br/>
              <span className="text-cyan-100">Access Portal</span>
            </h1>
            <p className="text-cyan-50 text-lg leading-relaxed max-w-sm mb-8">
              Gain secure access to monitor intern performance, review feedback reports, and manage departmental evaluations seamlessly.
            </p>

          </div>

          {/* Bottom Copyright */}
          <div className="relative z-10 text-xs text-cyan-100/60 hidden md:block">
            © {new Date().getFullYear()} Athenura India Pvt Ltd.
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="w-full md:w-7/12 bg-white flex flex-col px-8 py-10 md:px-12 relative">
          <div className="overflow-y-auto custom-scrollbar pr-2 h-full">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2 sticky top-0 bg-white z-10 pb-2">Create Account</h2>
            <p className="text-gray-500 mb-8 sticky top-12 bg-white z-10 pb-4 border-b border-gray-100">
              Please fill in your details to register.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 pb-4">
              
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email & Contact Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="john@athenura.in"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Contact Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={form.contactNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role & Secret Key Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Briefcase size={18} />
                    </div>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="e.g. Mentor"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Secret Key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Key size={18} />
                    </div>
                    <input
                      type="text"
                      name="secretKey"
                      value={form.secretKey}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="Admin Key"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#50B4C6] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#50B4C6] transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#50B4C6] focus:ring-4 focus:ring-[#50B4C6]/10 outline-none transition-all text-gray-800"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#50B4C6] transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg text-sm border border-red-100 animate-fade-up">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg text-sm border border-green-100 animate-fade-up">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {success}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#50B4C6] hover:bg-[#3ea0b2] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-[#50B4C6]/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center gap-2"
              >
                {loading ? (
                   <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Mobile Link */}
              <div className="text-center pt-2 md:hidden">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#50B4C6] font-bold hover:text-[#3ea0b2]"
                  >
                    Sign In
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

export default RegistrationPage;