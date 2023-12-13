const express = require("express");
const cookieParser = require("cookie-parser"); // parse cookie header and populate req.cookies
const bodyParser = require("body-parser"); // parses incoming request bodies (req.body)
const app = express();
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const mongooseConnection = require("./config/database");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(expressLayouts);

app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");
const key = process.env.SECRET;
app.use(
  session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 100 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes"));

mongooseConnection();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
