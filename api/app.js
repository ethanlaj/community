const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const database = require("./database");
const errorHandler = require("./errorHandler");

const healthRouter = require("./controllers/health");
const contactsRouter = require("./controllers/contacts");
const organizationsRouter = require("./controllers/organizations");
const locationsRouter = require("./controllers/locations");
const communicationsRouter = require("./controllers/communications");

const app = express();

database.sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Database synced successfully.");
	})
	.catch((err) => {
		console.error("Unable to sync database:", err);
	});

const corsOptions = {
	origin: "http://community-alb-1-1456052483.us-east-1.elb.amazonaws.com/",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Content-Type,Authorization",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.use("/", healthRouter);
app.use("/contacts", contactsRouter);
app.use("/organizations", organizationsRouter);
app.use("/locations", locationsRouter);
app.use("/communications", communicationsRouter);

app.use(errorHandler);

module.exports = app;
