const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/auth_jwt");

router.get("/", userController.getAllUsers);

router.post("/nameAvailable", userController.userNameAvailable);

router.post("/emailAvailable", userController.emailAvailable);

router.get("/byID/:userID", userController.getUserById);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.patch("/", checkAuth, userController.updateUser);

router.patch("/changePass", userController.updatePass);

router.get("/auth", checkAuth, userController.authUser);

module.exports = router;
