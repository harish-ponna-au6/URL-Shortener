var express = require("express");
const dotenv = require("dotenv").config();
var hbs = require("hbs");
var path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
require("./utils/hbs");
require("./db");

var app = express();

const PORT = process.env.PORT || 8080;
// Setting HBS as template engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view options", { layout: "layout" });

// Registering hbs partials
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Having user form body parsed
app.use(express.urlencoded({ extended: false }));

// Adding custom request type override query key name
app.use(methodOverride("cadbury"));

// Adding the session capabilities
app.use(
  session({
    secret: "todosAPIexpressappsecret",
    resave: false,
    name: "todoSession",
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    },
  })
);

// app.get("/", (req, res) =>
//   res.send({ message: "Hi, This is an URL Shortener Web Application" })
// );

app.get("/", function (req, res) {
  if(req.session.userId) return res.redirect("users/dashboard")
  return res.render("index", {
    title: "Home page",
    userId: req.session.userId,
  });
});

app.use(require("./routes/userRoutes"))

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
