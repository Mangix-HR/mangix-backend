const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { notFoundHandler } = require("./handlers/error.handler");
const cors = require("cors");
const AdminRoutes = require("./routes/admin.routes");
const Employee = require("./routes/employee.routes");
const Auth = require("./routes/auth.routes");
const Admin = require("./routes/admin.routes");
const Pontos = require("./routes/pontos.routes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

// Routers
app.use(Auth);
app.use(Admin);
app.use(Employee);
app.use(Pontos);

app.use(notFoundHandler);

module.exports = app;
