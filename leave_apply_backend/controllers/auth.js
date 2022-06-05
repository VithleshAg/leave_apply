const User = require("../models/user");
const { Leave } = require("../models/leave");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(404).json({ err: errorHandler(err) });

    const leave = new Leave({ user });
    leave.save((err, data) => {
      if (err) return res.status(404).json({ error: err });

      user.salt = undefined;
      user.hashed_password = undefined;

      res.json({
        user,
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user)
      return res
        .status(400)
        .json({ error: "User with this email dont exist. Please signup" });
    if (!user.authenticate(password))
      return res
        .status(401)
        .json({ error: "Email and password doesnot match" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) return res.status(403).json({ error: "Accees denied" });
  next();
};

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });

    req.profile = user;
    next();
  });
};
