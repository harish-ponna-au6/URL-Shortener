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

// Register page
router.get("/register", renderRegisterPage);
// Login page
router.get("/login", renderLoginPage);

//--------------------

router.post("/users/register", registerUser);

router.post("/users/login", loginUser);

router.get("/users/dashboard", dashboard);
router.get("/url-count/:urlcount", urlCount);
router.post("/users/postdashboard", postDashboard);

router.delete("/users/logout", authenticate,logOutUser);

module.exports = router;







module.exports = router;
