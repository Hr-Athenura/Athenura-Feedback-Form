import Feedback from '../models/FeedbackDB.js';



export const submitFeedback = async (req, res) => {
  try {
    const {
      internUniqueId,
      internName,
      department,
      seniorOrManager,
      joiningDate,

      // Internship experience questions
      Q1_internship,
      Q2_internship,
      Q3_internship,
      Q4_internship,
      Q5_internship,
      Q6_internship,

      // Mentor feedback questions
      Q1_incharge,
      Q2_incharge,
      Q3_incharge,

      // 🚨 Complaint (NEW)
      complaint,

      // Social media questions
      Q1_social,
      Q2_social
    } = req.body;

    // Validate required fields
    if (!internUniqueId || !internName || !department || !seniorOrManager || !joiningDate) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: internUniqueId, internName, department, seniorOrManager, or joiningDate'
      });
    }

    // Prevent duplicate submission
    const existingFeedback = await Feedback.findOne({ internUniqueId });
    if (existingFeedback) {
      return res.status(409).json({
        success: false,
        message: 'Feedback already submitted for this intern ID'
      });
    }

    // Create feedback document
    const newFeedback = new Feedback({
      // Intern Details
      internUniqueId: internUniqueId.trim(),
      internName: internName.trim(),
      department: department.trim(),
      seniorOrManager: seniorOrManager.trim(),
      joiningDate: new Date(joiningDate),

      // Internship Experience
      Q1_internship: { answer: Q1_internship?.answer?.trim() || '' },
      Q2_internship: { answer: Q2_internship?.answer?.trim() || '' },
      Q3_internship: {
        answer: Array.isArray(Q3_internship?.answer)
          ? Q3_internship.answer
          : []
      },
      Q4_internship: { answer: Q4_internship?.answer?.trim() || '' },
      Q5_internship: { answer: Q5_internship?.answer?.trim() || '' },
      Q6_internship: { answer: Q6_internship?.answer?.trim() || '' },

      // Mentor Feedback
      Q1_incharge: { answer: Q1_incharge?.answer || '' },
      Q2_incharge: { answer: Q2_incharge?.answer || '' },
      Q3_incharge: { answer: Q3_incharge?.answer?.trim() || '' },

      // 🚨 Complaint Section (Optional & Anonymous)
      complaint: {
        answer: complaint?.answer?.trim() || '',
        isOptional: true,
        submittedAnonymously: complaint?.submittedAnonymously || false
      },

      // Social Media
      Q1_social: { answer: Q1_social?.answer || '' },
      Q2_social: { answer: Q2_social?.answer || '' },

      // Metadata
      status: 'Pending',
      formSubmissionDate: new Date()
    });

    // Save
    const savedFeedback = await newFeedback.save();

    // Success response
    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully.',
      data: {
        id: savedFeedback._id,
        internUniqueId: savedFeedback.internUniqueId,
        internName: savedFeedback.internName,
        department: savedFeedback.department,
        submissionDate: savedFeedback.formSubmissionDate,
        status: savedFeedback.status,
        complaintSubmitted: Boolean(savedFeedback.complaint?.answer)
      }
    });

  } catch (error) {
    console.error('Feedback submission error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Feedback already exists for this intern ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Something went wrong'
    });
  }
};



export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .sort({ formSubmissionDate: -1 })
      .select('-__v')
      .lean();

    if (!feedbacks || feedbacks.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No feedbacks found",
        data: [],
        count: 0
      });
    }

    // 🔥 ADD complaintMetadata for frontend compatibility
    const enrichedFeedbacks = feedbacks.map(feedback => {
      const hasComplaint = Boolean(
        feedback.complaint?.answer &&
        feedback.complaint.answer.trim().length > 0
      );

      // 🧠 Basic priority detection (can be improved later)
      let priority = "None";
      if (hasComplaint) {
        const text = feedback.complaint.answer.toLowerCase();
        if (text.includes("harassment") || text.includes("threat")) {
          priority = "Critical";
        } else if (text.includes("payment") || text.includes("delay")) {
          priority = "High";
        } else if (text.includes("behavior") || text.includes("manager")) {
          priority = "Medium";
        } else {
          priority = "Low";
        }
      }

      return {
        ...feedback,

        // 🚨 Derived complaint metadata (NO DB CHANGE)
        complaintMetadata: {
          hasComplaint,
          priority,
          complaintCategory: hasComplaint ? "Intern Reported Issue" : "None",
          complaintDate: hasComplaint
            ? feedback.formSubmissionDate
            : null
        }
      };
    });

    res.status(200).json({
      success: true,
      message: "Feedbacks retrieved successfully",
      data: enrichedFeedbacks,
      count: enrichedFeedbacks.length
    });

  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feedbacks",
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};




export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !["Pending", "Reviewed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Pending' or 'Reviewed'"
      });
    }

    // Find and update feedback
    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Status updated to ${status} successfully`,
      data: feedback
    });

  } catch (error) {
    console.error('Error updating feedback status:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid feedback ID"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating status",
      error: process.env.NODE_ENV === 'production' ? {} : error.message
    });
  }
};