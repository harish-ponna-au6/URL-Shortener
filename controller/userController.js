var User = require("../models/user");
var URL = require("../models/url");
const { hash, compare } = require("bcryptjs");
const shortid = require("shortid");
const validUrl = require("valid-url");
const config = require("config");

module.exports = {
  renderRegisterPage: function (req, res) {
    if(req.session.userId) return res.redirect("users/dashboard")
    res.render("register", {
      title: "Register page",
    });
  },
  renderLoginPage: function (req, res) {
    if(req.session.userId) return res.redirect("users/dashboard")
    res.render("login", {
      title: "Login page",
    });
  },
  registerUser: function (req, res) {
    var user = new User({ ...req.body });
    user
      .save()
      .then(function (user) {
        req.session.userId = user._id;
        res.redirect("/users/dashboard");
      })
      .catch(function (err) {
        console.log(err);
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
      });
  },

  loginUser: function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password)
      return res.status(400).send("Incorrect credentials");
    User.findByEmailAndPassword(email, password)
      .then(function (user) {
        req.session.userId = user._id;
        res.redirect("/users/dashboard");
      })
      .catch(function (err) {
        console.log(err.message);
        res.redirect("/login");
      });
  },
  dashboard: function (req, res) {
    console.log(req.session.userId);
    URL.find({ userId: req.session.userId }).then((urls) => {
      console.log("Dashboard URL = ", urls);
      length = urls.length;
      res.render("dashboard", {
        urls,
        length,
      });
    });
  },

  postDashboard: async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = "http://localhost:8080/";

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).json("Invalid base url");
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
      try {
        let url = await URL.findOne({ longUrl });

        if (url) {
          res.redirect("/users/dashboard");
        } else {
          const shortUrl = baseUrl + urlCode;

          url = new URL({
            longUrl,
            shortUrl,
            urlCode,
            userId: req.session.userId,
          });

          await url.save();

          res.redirect("/users/dashboard");
        }
      } catch (err) {
        console.error(err);
        res.status(500).json("Server error");
      }
    } else {
      res.status(401).json("Invalid long url");
    }
  },
  urlCount: async (req, res) => {
    try {
	console.log("req",req.params.urlcount)
const all=await URL.find()
console.log("all",all)
      const url = await URL.findOne({urlCode:req.params.urlcount});
	console.log("url",url)
	console.log("urlcount",url.count)
      count = Number(url.count);
      count = count + 1;
      url.count = count;
	console.log("url-count",url.count)
      await URL.findOneAndUpdate(
        {urlCode:req.params.urlcount},
        {count:count}
      );
      res.redirect(url.longUrl);
    } catch (error) {
      console.log("Count: ", error);
    }
  },
  logOutUser: function (req, res) {
    req.session.destroy();
    return res.redirect("/");
  },
};
