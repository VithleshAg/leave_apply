const express = require("express");
const router = express.Router();

const { isAuth, requireSignin, userById } = require("../controllers/auth");
const { addInLeaveHistory } = require("../controllers/leave");

router.post("/leave/apply/:userId", requireSignin, isAuth, addInLeaveHistory);

router.param("userId", userById);

module.exports = router;
