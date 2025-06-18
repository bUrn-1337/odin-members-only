const express = require("express");
const path = require("node:path");
const session = require("express-session");
const passport = require('./config/passport');

const authRouter = require("./routes/auth");
const clubRouter = require("./routes/club");
const messageRouter = require("./routes/message");
const adminRouter = require("./routes/admin");

const indexController = require("./controllers/indexController");
const { ensureAuthenticated } = require("./middlewares/auth");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", authRouter);
app.get ("/", ensureAuthenticated, indexController.index);
app.use("/join-club", clubRouter);
app.use("/", messageRouter);
app.use("/become-admin", adminRouter);

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
  
    res.status(err.status || 500).render("error", {
      message: err.message,
      error: err, // In production, you'd hide this
    });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));