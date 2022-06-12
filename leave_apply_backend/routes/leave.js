const express = require("express");
const router = express.Router();

const { isAuth, requireSignin, userById } = require("../controllers/auth");
const { addInLeaveHistory, getLeaveHistory } = require("../controllers/leave");

router.post("/leave/apply/:userId", requireSignin, isAuth, addInLeaveHistory);
router.get(
  "/leave/history/:type/:userId",
  requireSignin,
  isAuth,
  getLeaveHistory
);

router.param("userId", userById);

module.exports = router;
