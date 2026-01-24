import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  // 🧩 INTERN DETAILS
  internUniqueId: { type: String, required: true, trim: true },
  internName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  seniorOrManager: { type: String, required: true, trim: true },
  joiningDate: { type: Date, required: true },

  // 🌟 INTERN FEEDBACK SECTION
  Q1_internship: {
    question: {
      type: String,
      default:
        "What tasks or responsibilities did you handle during your internship?",
    },
    answer: { type: String, default: "" },
  },
  Q2_internship: {
    question: {
      type: String,
      default:
        "Which project or activity did you find most meaningful or enjoyable?",
    },
    answer: { type: String, default: "" },
  },
  Q3_internship: {
    question: {
      type: String,
      default: "What new skills did you learn or improve during your internship?",
    },
    answer: { type: [String], default: [] },
  },
  Q4_internship: {
    question: {
      type: String,
      default:
        "How was your overall experience working with your team and mentor?",
    },
    answer: { type: String, default: "" },
  },
  Q5_internship: {
    question: {
      type: String,
      default: "What did you like the most about the internship program?",
    },
    answer: { type: String, default: "" },
  },
  Q6_internship: {
    question: {
      type: String,
      default: "Any suggestions to make the internship experience better?",
    },
    answer: { type: String, default: "" },
  },

  // 💬 IN-CHARGE / MENTOR FEEDBACK SECTION
  Q1_incharge: {
    question: {
      type: String,
      default:
        "How helpful and supportive was your in-charge during your internship?",
    },
    answer: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Needs Improvement", ""],
      default: "",
    },
  },
  Q2_incharge: {
    question: {
      type: String,
      default: "Did your in-charge provide clear guidance and regular feedback?",
    },
    answer: {
      type: String,
      enum: ["Yes, regularly", "Sometimes", "Rarely", "No", ""],
      default: "",
    },
  },
  Q3_incharge: {
    question: {
      type: String,
      default:
        "Any message or appreciation you’d like to share with your in-charge?",
    },
    answer: { type: String, default: "" },
  },

  // 📱 SOCIAL MEDIA ENGAGEMENT SECTION
  Q1_social: {
    question: {
      type: String,
      default: "Are you following Graphura on Instagram?",
    },
    answer: { type: String, enum: ["Yes", "No", ""], default: "" },
  },
  Q2_social: {
    question: {
      type: String,
      default: "Are you following Graphura on LinkedIn?",
    },
    answer: { type: String, enum: ["Yes", "No", ""], default: "" },
  },

  status: { type: String, enum: ["Pending", "Reviewed"], default: "Pending" },


  // 🚨 COMPLAINT / ISSUE SECTION (Optional & Confidential)
  complaint: {
    question: {
      type: String,
      default: "Describe any issue or complaint you faced during the internship (Optional)",
    },
    answer: {
      type: String,
      default: "",
      trim: true,
    },
    isOptional: {
      type: Boolean,
      default: true,
    },
    submittedAnonymously: {
      type: Boolean,
      default: false,
    },
  },


  // 🗓️ FORM INFO
  formSubmissionDate: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema, "Feedback");
export default Feedback;
