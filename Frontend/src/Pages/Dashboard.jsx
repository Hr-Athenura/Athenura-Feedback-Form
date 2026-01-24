import React, { useState, useEffect } from "react";
import {
  User,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Shield,
  X,
  ChevronDown,
  FileText,
  Users,
  Building,
  CalendarDays,
  FileSpreadsheet,
  MessageSquareWarning
} from "lucide-react";

const DashboardNavbar = ({ userName, onLogout }) => (
  <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 md:py-5 bg-white rounded-t-3xl border-b shadow-sm">
    <h2 className="text-xl md:text-2xl font-bold text-[#5446e0] mb-3 md:mb-0 text-center md:text-left flex items-center">
      <BarChart3 className="w-6 h-6 mr-3" />
      Intern Feedback Dashboard
    </h2>
    <div className="flex items-center gap-3 md:gap-4">
      <span className="bg-blue-50 px-3 md:px-4 py-2 rounded-xl text-blue-700 font-bold flex items-center shadow text-sm md:text-base">
        <User className="w-4 h-4 mr-2" />
        {userName}
      </span>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 md:px-5 rounded-xl shadow-lg focus:outline-none transition text-sm md:text-base flex items-center"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </button>
    </div>
  </nav>
);

const InfoCard = ({ title, value, gradient, icon, subtitle }) => (
  <div className={`flex flex-col justify-between rounded-2xl shadow-lg p-4 md:p-6 w-full min-h-[110px] md:min-h-[120px] ${gradient}`}>
    <div className="flex items-center justify-between">
      <span className="font-bold text-white uppercase text-xs md:text-sm">{title}</span>
      <div className="text-white/80">
        {icon}
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:items-end mt-3 md:mt-5">
      <span className="text-2xl md:text-3xl font-extrabold text-white">{value}</span>
      {subtitle && (
        <span className="mt-1 md:mt-0 md:ml-2 text-xs md:text-sm text-white/90">{subtitle}</span>
      )}
    </div>
  </div>
);

const StatusBadge = ({ status, onClick, isClickable = false, size = "md" }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Reviewed":
        return "bg-green-400 text-white hover:bg-green-500";
      case "Pending":
        return "bg-yellow-400 text-white hover:bg-yellow-500";
      case "Complaint Reported":
        return "bg-red-400 text-white hover:bg-red-500";
      case "Resolved":
        return "bg-blue-400 text-white hover:bg-blue-500";
      default:
        return "bg-gray-400 text-white hover:bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Reviewed":
        return <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />;
      case "Pending":
        return <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />;
      case "Complaint Reported":
        return <AlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />;
      case "Resolved":
        return <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1" />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs rounded-xl",
    md: "px-4 py-1 rounded-2xl text-sm",
    lg: "px-5 py-2 rounded-2xl text-base"
  };

  return (
    <span
      className={`inline-flex items-center font-bold shadow-md transition-all duration-200 ${sizeClasses[size]} ${getStatusStyles(status)} ${isClickable ? "cursor-pointer transform hover:scale-105" : "cursor-default"
        }`}
      onClick={isClickable ? onClick : undefined}
      title={isClickable ? "Click to change status" : ""}
    >
      {getStatusIcon(status)}
      {status}
    </span>
  );
};

const ComplaintBadge = ({ priority, size = "sm" }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs rounded-lg",
    md: "px-3 py-1 text-sm rounded-xl",
    lg: "px-4 py-2 text-base rounded-2xl"
  };

  if (!priority || priority === "None") return null;

  return (
    <span className={`inline-flex items-center font-bold shadow ${sizeClasses[size]} ${getPriorityStyles(priority)}`}>
      <AlertCircle className="w-3 h-3 mr-1" />
      {priority}
    </span>
  );
};

const FeedbackModal = ({ feedback, isOpen, onClose, onStatusUpdate }) => {
  const [localStatus, setLocalStatus] = useState(feedback?.status);
  const [activeTab, setActiveTab] = useState("intern");

  useEffect(() => {
    setLocalStatus(feedback?.status);
  }, [feedback]);

  if (!isOpen || !feedback) return null;

  const handleStatusChange = async (newStatus) => {
    try {
      await onStatusUpdate(feedback._id, newStatus);
      setLocalStatus(newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const tabs = [
    { id: "intern", label: "Intern Feedback", icon: <User className="w-4 h-4" /> },
    { id: "mentor", label: "Mentor Feedback", icon: <Users className="w-4 h-4" /> },
    { id: "social", label: "Social Media", icon: <MessageSquareWarning className="w-4 h-4" /> },
    { id: "complaint", label: "Complaint", icon: <AlertCircle className="w-4 h-4" />, show: feedback?.complaint?.answer || feedback?.complaintMetadata?.hasComplaint }
  ].filter(tab => tab.show !== false);

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-8">
          {/* Modal Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#5446e0] flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Feedback Details - {feedback.internName}
              </h3>
              {feedback.complaintMetadata?.hasComplaint && (
                <div className="flex items-center gap-2 mt-2">
                  <ComplaintBadge priority={feedback.complaintMetadata?.priority} size="md" />
                  <span className="text-sm text-gray-600">
                    Category: {feedback.complaintMetadata?.complaintCategory}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
                <StatusBadge
                  status={localStatus}
                  onClick={() => handleStatusChange(localStatus === "Pending" ? "Reviewed" : "Pending")}
                  isClickable={true}
                  size="md"
                />
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Intern Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <strong className="text-sm">Unique ID:</strong>
                <p className="text-gray-700">{feedback.internUniqueId}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <strong className="text-sm">Department:</strong>
                <p className="text-gray-700">{feedback.department}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <strong className="text-sm">Manager/Senior:</strong>
                <p className="text-gray-700">{feedback.seniorOrManager}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
              <div>
                <strong className="text-sm">Joining Date:</strong>
                <p className="text-gray-700">{new Date(feedback.joiningDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex flex-wrap gap-2 md:gap-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 md:px-4 py-2 text-sm font-medium rounded-lg transition ${activeTab === tab.id
                    ? 'bg-[#5446e0] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {tab.icon}
                  <span className="ml-2 hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "intern" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { key: 'Q1_internship', label: 'Tasks & Responsibilities' },
                  { key: 'Q2_internship', label: 'Most Meaningful Project' },
                  { key: 'Q4_internship', label: 'Team & Mentor Experience' },
                  { key: 'Q5_internship', label: 'Most Liked Aspect' },
                  { key: 'Q6_internship', label: 'Suggestions', fullWidth: true }
                ].map(({ key, label, fullWidth }) => (
                  <div key={key} className={fullWidth ? "lg:col-span-2" : ""}>
                    <label className="font-semibold text-gray-700 block mb-2">{label}</label>
                    <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
                      {feedback[key]?.answer || "No response provided"}
                    </p>
                  </div>
                ))}
                <div className="lg:col-span-2">
                  <label className="font-semibold text-gray-700 block mb-2">
                    Skills Learned
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {Array.isArray(feedback.Q3_internship?.answer) && feedback.Q3_internship.answer.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {feedback.Q3_internship.answer.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No skills listed</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mentor" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'Q1_incharge', label: 'Support Level' },
                  { key: 'Q2_incharge', label: 'Guidance Frequency' },
                  { key: 'Q3_incharge', label: 'Message to Mentor', fullWidth: true }
                ].map(({ key, label, fullWidth }) => (
                  <div key={key} className={fullWidth ? "md:col-span-3" : ""}>
                    <label className="font-semibold text-gray-700 block mb-2">{label}</label>
                    <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
                      {feedback[key]?.answer || "No response provided"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "social" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'Q1_social', label: 'Instagram Follow' },
                  { key: 'Q2_social', label: 'LinkedIn Follow' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="font-semibold text-gray-700 block mb-2">{label}</label>
                    <div className="flex items-center gap-4">
                      <p className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px] flex-1">
                        {feedback[key]?.answer || "No response provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "complaint" && (
              <div className="space-y-6">
                {feedback.complaintMetadata?.hasComplaint ? (
                  <>
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Complaint Reported</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <strong className="text-sm text-gray-600">Category:</strong>
                              <p className="text-gray-700">{feedback.complaintMetadata?.complaintCategory}</p>
                            </div>
                            <div>
                              <strong className="text-sm text-gray-600">Report Date:</strong>
                              <p className="text-gray-700">
                                {new Date(feedback.complaintMetadata?.complaintDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-2">Complaint Details</label>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap">
                        {feedback.complaint?.answer || "No complaint details provided"}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {feedback.complaint?.submittedAnonymously
                          ? "Submitted anonymously"
                          : "Not submitted anonymously"}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No complaint reported for this feedback</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-6 border-t gap-4">
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Submitted on: {new Date(feedback.formSubmissionDate).toLocaleDateString()}
            </div>
            <button
              onClick={onClose}
              className="bg-[#5446e0] hover:bg-[#4538d0] text-white font-bold py-2 px-6 rounded-xl transition flex items-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const exportCSV = (data) => {
  // Enhanced headers with questions and complaint fields
  const headers = [
    // Basic Info
    "Name", "Unique ID", "Department", "Manager/Senior", "Joining Date", "Status", "Submission Date",

    // Complaint Info
    "Has Complaint", "Complaint Priority", "Complaint Category", "Complaint Date", "Complaint Details", "Anonymous Submission",

    // Intern Feedback
    "Intern Q1: Tasks & Responsibilities",
    "Intern A1: Answer",
    "Intern Q2: Most Meaningful Project",
    "Intern A2: Answer",
    "Intern Q3: Skills Learned",
    "Intern A3: Answer",
    "Intern Q4: Team Experience",
    "Intern A4: Answer",
    "Intern Q5: Liked Most",
    "Intern A5: Answer",
    "Intern Q6: Suggestions",
    "Intern A6: Answer",

    // In-charge Feedback
    "In-charge Q1: Support Level",
    "In-charge A1: Answer",
    "In-charge Q2: Guidance Frequency",
    "In-charge A2: Answer",
    "In-charge Q3: Message to In-charge",
    "In-charge A3: Answer",

    // Social Media
    "Social Q1: Instagram Follow",
    "Social A1: Answer",
    "Social Q2: LinkedIn Follow",
    "Social A2: Answer"
  ];

  const rows = data.map(feedback => [
    // Basic Info
    feedback.internName,
    feedback.internUniqueId,
    feedback.department,
    feedback.seniorOrManager,
    new Date(feedback.joiningDate).toLocaleDateString(),
    feedback.status,
    new Date(feedback.formSubmissionDate).toLocaleDateString(),

    // Complaint Info
    feedback.complaintMetadata?.hasComplaint ? "Yes" : "No",
    feedback.complaintMetadata?.priority || "None",
    feedback.complaintMetadata?.complaintCategory || "None",
    feedback.complaintMetadata?.complaintDate ? new Date(feedback.complaintMetadata.complaintDate).toLocaleDateString() : "",
    feedback.complaint?.answer || "",
    feedback.complaint?.submittedAnonymously ? "Yes" : "No",

    // Intern Feedback
    feedback.Q1_internship.question,
    feedback.Q1_internship.answer,
    feedback.Q2_internship.question,
    feedback.Q2_internship.answer,
    feedback.Q3_internship.question,
    Array.isArray(feedback.Q3_internship.answer) ? feedback.Q3_internship.answer.join('; ') : feedback.Q3_internship.answer,
    feedback.Q4_internship.question,
    feedback.Q4_internship.answer,
    feedback.Q5_internship.question,
    feedback.Q5_internship.answer,
    feedback.Q6_internship.question,
    feedback.Q6_internship.answer,

    // In-charge Feedback
    feedback.Q1_incharge.question,
    feedback.Q1_incharge.answer,
    feedback.Q2_incharge.question,
    feedback.Q2_incharge.answer,
    feedback.Q3_incharge.question,
    feedback.Q3_incharge.answer,

    // Social Media
    feedback.Q1_social.question,
    feedback.Q1_social.answer,
    feedback.Q2_social.question,
    feedback.Q2_social.answer
  ]);

  const csvContent = [headers, ...rows].map(row =>
    row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `intern_feedback_with_complaints_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function FeedbackDashboard() {
  const [user, setUser] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportOption, setExportOption] = useState("withQuestions");
  const [stats, setStats] = useState({
    total: 0,
    reviewed: 0,
    pending: 0,
    complaints: 0,
    criticalComplaints: 0,
    thisMonth: 0
  });

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [feedbacks]);

  const calculateStats = () => {
    const total = feedbacks.length;
    const reviewed = feedbacks.filter(f => f.status === "Reviewed").length;
    const pending = feedbacks.filter(f => f.status === "Pending").length;
    const complaints = feedbacks.filter(f => f.complaintMetadata?.hasComplaint).length;
    const criticalComplaints = feedbacks.filter(f =>
      f.complaintMetadata?.hasComplaint && f.complaintMetadata?.priority === "Critical"
    ).length;
    const thisMonth = feedbacks.filter(feedback => {
      const submissionDate = new Date(feedback.formSubmissionDate);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return submissionDate.getMonth() === currentMonth && submissionDate.getFullYear() === currentYear;
    }).length;

    setStats({ total, reviewed, pending, complaints, criticalComplaints, thisMonth });
  };

  const checkAuthAndLoadData = async () => {
    try {
      const authResponse = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include'
      });

      if (!authResponse.ok) {
        throw new Error('Not authenticated');
      }

      const authData = await authResponse.json();
      setUser(authData.user);
      await fetchFeedbacks();
    } catch (error) {
      console.error('Auth check failed:', error);
      window.location.href = '/signup';
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/feedbacks', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
      }

      const result = await response.json();

      if (result.success && result.data) {
        setFeedbacks(result.data);
      } else if (Array.isArray(result)) {
        setFeedbacks(result);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      alert('Failed to load feedback data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (feedbackId, newStatus) => {
    try {
      const response = await fetch(`/api/feedbacks/${feedbackId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const result = await response.json();

      if (result.success) {
        setFeedbacks(prevFeedbacks =>
          prevFeedbacks.map(feedback =>
            feedback._id === feedbackId
              ? { ...feedback, status: newStatus }
              : feedback
          )
        );

        if (selectedFeedback && selectedFeedback._id === feedbackId) {
          setSelectedFeedback(prev => ({ ...prev, status: newStatus }));
        }

        return result;
      } else {
        throw new Error(result.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status: ' + error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/signup';
    }
  };

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (feedbackId, newStatus) => {
    await updateFeedbackStatus(feedbackId, newStatus);
  };

  const handleExport = () => {
    if (exportOption === "withQuestions") {
      exportCSV(filteredFeedbacks);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    (search === "" ||
      feedback.internName.toLowerCase().includes(search.toLowerCase()) ||
      feedback.internUniqueId.toLowerCase().includes(search.toLowerCase())) &&
    (filterDept === "" || feedback.department === filterDept) &&
    (filterStatus === "" || feedback.status === filterStatus) &&
    (filterPriority === "" ||
      (filterPriority === "withComplaint" && feedback.complaintMetadata?.hasComplaint) ||
      (filterPriority === "critical" && feedback.complaintMetadata?.priority === "Critical") ||
      (filterPriority === "noComplaint" && !feedback.complaintMetadata?.hasComplaint))
  );

  const departments = [...new Set(feedbacks.map(f => f.department))].filter(Boolean);
  const statuses = [...new Set(feedbacks.map(f => f.status))].filter(Boolean);

  if (loading) {
    return (
      <div className="bg-[#eceefd] min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-[#5446e0] flex items-center">
          <Clock className="w-8 h-8 mr-3 animate-spin" />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eceefd] min-h-screen">
      <div className="w-full shadow-md bg-white max-w-8xl mx-auto">
        <DashboardNavbar
          userName={user?.fullName || user?.username || "User"}
          onLogout={handleLogout}
        />
        <div className="px-4 md:px-7 pb-8 pt-2 w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10 mt-2">
            <InfoCard
              title="Total Feedback"
              value={stats.total}
              gradient="bg-gradient-to-br from-[#a259f7] via-[#6b67ec] to-[#5e7fff]"
              icon={<BarChart3 className="w-5 h-5 md:w-6 md:h-6" />}
            />
            <InfoCard
              title="Reviewed"
              value={stats.reviewed}
              subtitle={`${stats.total > 0 ? Math.round((stats.reviewed / stats.total) * 100) : 0}%`}
              gradient="bg-gradient-to-br from-[#00c6ff] to-[#0072ff]"
              icon={<CheckCircle className="w-5 h-5 md:w-6 md:h-6" />}
            />
            <InfoCard
              title="Pending"
              value={stats.pending}
              subtitle={`${stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%`}
              gradient="bg-gradient-to-br from-[#fc6c8f] to-[#ffb86c]"
              icon={<Clock className="w-5 h-5 md:w-6 md:h-6" />}
            />
            <InfoCard
              title="Complaints"
              value={stats.complaints}
              subtitle={`${stats.criticalComplaints} critical`}
              gradient="bg-gradient-to-br from-[#ff4d4d] to-[#f9cb28]"
              icon={<AlertCircle className="w-5 h-5 md:w-6 md:h-6" />}
            />
          </div>

          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  placeholder="Search name or UID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border-2 border-[#e4dbfa] focus:border-[#b884f6] focus:ring-2 focus:ring-violet-200 rounded-2xl pl-12 pr-6 py-3 w-full bg-white shadow transition"
                />
              </div>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="relative flex-1 min-w-[150px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterDept}
                    onChange={e => setFilterDept(e.target.value)}
                    className="border-2 border-[#e4dbfa] focus:border-[#b884f6] focus:ring-2 focus:ring-violet-200 rounded-2xl pl-12 pr-10 py-3 w-full bg-white shadow appearance-none"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative flex-1 min-w-[150px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="border-2 border-[#e4dbfa] focus:border-[#b884f6] focus:ring-2 focus:ring-violet-200 rounded-2xl pl-12 pr-10 py-3 w-full bg-white shadow appearance-none"
                  >
                    <option value="">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Export Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Export Format:</span>
                <select
                  value={exportOption}
                  onChange={e => setExportOption(e.target.value)}
                  className="border-2 border-[#e4dbfa] focus:border-[#b884f6] focus:ring-2 focus:ring-violet-200 rounded-2xl px-4 py-2 bg-white shadow text-sm md:text-base"
                >
                  <option value="withQuestions">CSV with Questions</option>
                </select>
              </div>

              <button
                onClick={handleExport}
                disabled={filteredFeedbacks.length === 0}
                className="bg-gradient-to-r from-[#a259f7] via-[#6b67ec] to-[#5e7fff] hover:from-blue-700 hover:to-purple-500 transition text-white px-6 md:px-12 py-3 md:py-4 text-sm md:text-base font-bold rounded-2xl shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Export CSV ({filteredFeedbacks.length})
              </button>
            </div>
          </div>

          {/* Feedback Table */}
          <div className="rounded-3xl shadow-xl border-2 border-[#e7eaf4] bg-white mb-8 
                max-h-[70vh] overflow-y-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-[#f5f7fc] text-[#566078] text-sm md:text-base rounded-t-xl">
                  <th className="py-4 px-3 md:px-5 font-bold">Name</th>
                  <th className="py-4 px-3 md:px-5 font-bold">UID</th>
                  <th className="py-4 px-3 md:px-5 font-bold hidden md:table-cell">Department</th>
                  <th className="py-4 px-3 md:px-5 font-bold hidden lg:table-cell">Manager</th>
                  <th className="py-4 px-3 md:px-5 font-bold">Status</th>
                  <th className="py-4 px-3 md:px-5 font-bold hidden md:table-cell">Submission</th>
                  <th className="py-4 px-3 md:px-5 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 px-5 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-lg">
                          {feedbacks.length === 0
                            ? "No feedback data available"
                            : "No matching feedback found"}
                        </p>
                        {(filterDept || filterStatus || filterPriority) && (
                          <button
                            onClick={() => {
                              setFilterDept("");
                              setFilterStatus("");
                              setFilterPriority("");
                              setSearch("");
                            }}
                            className="mt-4 text-[#5446e0] hover:text-[#4538d0] font-medium"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map(feedback => (
                    <tr key={feedback._id || feedback.internUniqueId}
                      className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-4 px-3 md:px-5 font-semibold text-[#1a2453]">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-500 hidden sm:block" />
                          {feedback.internName}
                        </div>
                        {feedback.complaintMetadata?.hasComplaint && (
                          <div className="flex items-center mt-1">
                            <AlertCircle className="w-3 h-3 text-red-500 mr-1" />
                            <span className="text-xs text-red-600">Complaint</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-3 md:px-5 text-sm">{feedback.internUniqueId}</td>
                      <td className="py-4 px-3 md:px-5 font-medium hidden md:table-cell">
                        {feedback.department}
                      </td>
                      <td className="py-4 px-3 md:px-5 hidden lg:table-cell">
                        {feedback.seniorOrManager}
                      </td>
                      <td className="py-4 px-3 md:px-5">
                        <div className="flex flex-col gap-2">
                          <StatusBadge
                            status={feedback.status}
                            onClick={() => handleStatusUpdate(feedback._id, feedback.status === "Pending" ? "Reviewed" : "Pending")}
                            isClickable={true}
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className="py-4 px-3 md:px-5 hidden md:table-cell">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-3 h-3 mr-2" />
                          {new Date(feedback.formSubmissionDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-3 md:px-5">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleViewFeedback(feedback)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-7 py-2 rounded-2xl shadow font-semibold flex items-center gap-2 transition text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          {feedback.complaintMetadata?.hasComplaint && (
                            <button
                              onClick={() => handleViewFeedback(feedback)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-2xl shadow font-semibold flex items-center gap-2 transition text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Complaint</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          {filteredFeedbacks.length > 0 && (
            <div className="text-sm text-gray-600 flex flex-wrap items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span>Reviewed: {filteredFeedbacks.filter(f => f.status === "Reviewed").length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <span>Pending: {filteredFeedbacks.filter(f => f.status === "Pending").length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span>Complaints: {filteredFeedbacks.filter(f => f.complaintMetadata?.hasComplaint).length}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <span>Showing {filteredFeedbacks.length} of {feedbacks.length} total</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        feedback={selectedFeedback}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedFeedback(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}