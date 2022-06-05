const { Leave } = require("../models/leave");

exports.addInLeaveHistory = (req, res) => {
  const userId = req.profile._id;
  const { total, leave_type } = req.body;
  const fromDate = new Date(req.body.from);
  const toDate = new Date(req.body.to);
  const totalDays =
    (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  Leave.findOne({ user: userId }).exec((err, result) => {
    if (err) return res.status(400).json({ error: "User not found" });

    if (!(totalDays >= 1 && totalDays == total))
      return res
        .status(400)
        .json({ error: "Invalid field: from or to or total" });

    if (leave_type == "Annual leave" && result.annual_leave_left >= totalDays) {
      result.annual_leave_left = result.annual_leave_left - totalDays;
      result.annual_leave_taken = result.annual_leave_taken + totalDays;

      if (result.annual_leave_left < 0)
        return res
          .status(400)
          .json({ error: "Annual leave can't be less than 0" });
    } else if (
      leave_type == "Sick leave" &&
      result.sick_leave_left >= totalDays
    ) {
      result.sick_leave_left = result.sick_leave_left - totalDays;
      result.sick_leave_taken = result.sick_leave_taken + totalDays;

      if (result.sick_leave_left < 0)
        return res
          .status(400)
          .json({ error: "Sick leave can't be less than 0" });
    }

    result.leaves.push(req.body.leaves);

    result.save((err, data) => {
      if (err)
        return res.status(400).json({ error: "Leaves can't be updated" });

      res.json({ data });
    });
  });
};
