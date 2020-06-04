var express = require("express");
var router = express.Router();
const {
  registerUser,
  loginUser,
  logOutUser,
  renderRegisterPage,
  renderLoginPage,
  dashboard,
  postDashboard,
  urlCount,
} = require("../controller/userController");
const {authenticate} = require("../middleware/authenticate");


router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.get("/users/dashboard", authenticate, dashboard);
router.get("/:urlcount", authenticate,  urlCount);
router.post("/users/postdashboard", authenticate, postDashboard);

router.delete("/users/logout", authenticate,logOutUser);

module.exports = router;


