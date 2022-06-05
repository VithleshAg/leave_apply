const express = require("express");
const router = express.Router();

const { signin, signup, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
