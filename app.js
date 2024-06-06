const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { notFoundHandler } = require("./handlers/error.handler");
const { AuthRoutes } = require("./routes/auth.routes");
const cors = require("cors");
const AdminRoutes = require("./routes/admin.routes");
const { checkAuth } = require("./middleware/checkAuth");
const Employee = require("./routes/employee.routes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(AuthRoutes);

// app.use(checkAuth);
app.use(AdminRoutes);
app.use(Employee);

app.use(notFoundHandler);

module.exports = app;
