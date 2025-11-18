const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const headerParser = require("header-parser");

const helmet = require("helmet");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

require("../services/Passport");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//require all the routes
var IndexRouter = require("../routes/IndexRoute");
var UserRouter = require("../routes/UserRoute");
var CategoryRouter = require("../routes/CategoryRoute");
var ProductRouter = require("../routes/ProductRoute");
var TeacherRouter = require("../routes/TeacherRoute");
var ClassRouter = require("../routes/ClassRoute");
var StudentRouter = require("../routes/StudentRoute");
var SubjectRouter = require("../routes/SubjectRoute");
var AttendanceRouter = require("../routes/AttendanceRoute");
var CurriculumRouter = require("../routes/CurriculumRoute");
var LearningRouter = require("../routes/LearningRoute");
var ExamRouter = require("../routes/ExamRoute");
var GradeRouter = require("../routes/GradeRoute");
var BillingRouter = require("../routes/BillingRoute");
var CardRouter = require("../routes/CardRoute");
var LibraryRouter = require("../routes/LibraryRoute");

const server = express();

// load all this module
server.use(bodyParser.json());
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);
server.use(morgan("tiny"));
server.use(cookieParser());
server.use(helmet());
server.use(cors());
server.use(headerParser);
server.use(passport.initialize());

/**
 * enable CORS
 */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//prefix all the routes
server.use(IndexRouter);
server.use(UserRouter);
server.use(CategoryRouter);
server.use(ProductRouter);
server.use(TeacherRouter);
server.use(ClassRouter);
server.use(StudentRouter);
server.use(SubjectRouter);
server.use(AttendanceRouter);
server.use(CurriculumRouter);
server.use(LearningRouter);
server.use(ExamRouter);
server.use(GradeRouter);
server.use(BillingRouter);
server.use(CardRouter);
server.use(LibraryRouter);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error page
  res.status(err.status || 500);
  res.json({ message: res.locals.message });

  next();
});

module.exports = server;
