
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/auth.controller");

router.post("/register",controller.register);
router.post("/login",controller.login);
router.post("/logout",auth,controller.logout);
router.delete("/delete",auth,controller.deleteUser);

module.exports = router;
