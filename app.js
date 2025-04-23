const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
require("dotenv").config();

const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
// const cookieSession = require("cookie-session");
const helmet = require("helmet");
// const url = "mongodb://localhost/hab2";
//const url = process.env.MONGO_URI;
const app = express();

// compress responses
app.use(compression());

const PORT = process.env.PORT;

const passportSetup = require("./config/passport");

require("dotenv").config();
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//checking whether connected successfully or not

const db = mongoose.connection;
db.on("error", console.error.bind(console.log("connecting...")));
db.once("open", () => {
  console.log("database connected");
});

const userRoutes = require("./routes/userupdated.routes");
const adminRoutes = require("./routes/admin.routes");
const noticeRoutes = require("./routes/notice.routes");
const functionaryRoutes = require("./routes/functionary.routes");
const announcementRoutes = require("./routes/announcement.routes");
const formRoutes = require("./routes/form.routes");
const hostelRoutes = require("./routes/hostel.routes");
const adminUploadRoutes = require("./routes/adminUploads.routes");
const linkRoutes = require("./routes/link.routes");
const ordinanceRoutes = require("./routes/ordinance.routes");
const authRoutes = require("./routes/auth.routes");
const aboutRoutes = require("./routes/about.routes");
const hostelProfileRoutes = require("./routes/hostelprofile.routes");

app.use("/hab/", express.static(__dirname + "/public"));
app.use("/hab/uploads", express.static(__dirname + "/uploads"));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(
  session({
    secret: "Once again rusty is the cutest dog",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.set("view engine", "ejs");

//app.get("/", (req, res) => res.redirect("/hab"));
app.use("/hab/auth", authRoutes);
app.use("/hab", userRoutes);
app.use("/hab/admin", adminRoutes);
app.use("/hab/admin/notice", noticeRoutes);
app.use("/hab/admin/announcement", announcementRoutes);
app.use("/hab/admin/functionary", functionaryRoutes);
app.use("/hab/admin/hostels", hostelRoutes);
app.use("/hab/admin/uploads", adminUploadRoutes);
app.use("/hab/admin/form", formRoutes);
app.use("/hab/admin/links", linkRoutes);
app.use("/hab/admin/ordinance", ordinanceRoutes);
app.use("/hab/admin/about", aboutRoutes);
app.use("/hab/admin/hostel/", hostelProfileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
