const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { use } = require("../routes/book");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    if (
      invalidEmail(req.body.email) ||
      invalidUsername(req.body.username) ||
      invalidPassword(req.body.password)
    )
      res.status(400).json({ msg: "Invalid input" });
    else {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      console.log("hash done");
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      res.status(201).json({ userID: user.userID });
    }
  } catch (err) {
    console.log(err, "\n\n");
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    let user;
    if (invalidEmail(req.body.username)) {
      user = await User.scope("withPassword").findOne({
        where: { username: req.body.username },
      });
    } else {
      console.log("logging in with email");
      user = await User.scope("withPassword").findOne({
        where: { email: req.body.username },
      });
    }

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);

      if (result) {
        const token = jwt.sign(
          {
            username: user.username,
            userID: user.userID,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "5h",
          }
        );
        res.status(200).json({
          message: "Login successfull...",
          userID: user.userID,
          token: token,
        });
      } else {
        res.status(401).json({ msg: "Username or Psssword is incorrect" });
      }
    } else {
      res.status(401).json({
        msg: "Username or password is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userID);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (invalidEmail(req.body.email)) {
      res.status(400).json({ msg: "Invalid email" });
    } else {
      await User.update(
        {
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          phoneNumber: req.body.phoneNumber,
          regNo: req.body.regNo,
          session: req.body.session,
        },
        { where: { userID: req.userID } }
      );
      res.status(204).json({ msg: "Details Updated" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.updatePass = async (req, res) => {
  try {
    const user = await User.scope("withPassword").findOne({
      where: { username: req.body.username },
    });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const hash = await bcrypt.hash(req.body.newPass, saltRounds);
        await User.update(
          {
            password: hash,
          },
          { where: { userID: user.userID } }
        );
        res.status(204).json({ msg: "Password Updated" });
      } else res.status(400).json({ msg: "Invalid" });
    } else res.status(400).json({ msg: "Invalid" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.authUser = (req, res) => {
  res.status(200).json({
    message: "OK",
    user: req.userID,
  });
};

exports.userNameAvailable = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });
    user
      ? res.status(409).json({ msg: "Username already exists" })
      : res.status(200).json({ msg: "Username Available" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.emailAvailable = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    user
      ? res.status(409).json({ msg: "Email already exists" })
      : res.status(200).json({ msg: "Email Available" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const invalidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
};
const invalidUsername = (username) => {
  const re = /^[A-z][A-z0-9-_]{5,24}$/;
  return !re.test(username);
};
const invalidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
  return !re.test(password);
};
