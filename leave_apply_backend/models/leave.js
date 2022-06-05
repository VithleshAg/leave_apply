const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const leaveHistorySchema = mongoose.Schema(
  {
    leave_type: {
      type: String,
      default: "Annual leave",
      enum: ["Annual leave", "Sick leave"],
    },
    from: Date,
    to: Date,
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const LeaveHistory = mongoose.model("LeaveHistory", leaveHistorySchema);

const leaveSchema = mongoose.Schema(
  {
    annual_leave_left: {
      type: Number,
      default: 18,
      min: 0,
    },
    sick_leave_left: {
      type: Number,
      default: 5,
      min: 0,
    },
    annual_leave_taken: {
      type: Number,
      default: 0,
      max: 18,
    },
    sick_leave_taken: {
      type: Number,
      default: 0,
      max: 5,
    },
    user: { type: ObjectId, ref: "User" },
    leaves: [leaveHistorySchema],
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = { Leave, LeaveHistory };
