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

var allowedOrigins = [
	"http://localhost:3000",
	"http://community-alb-1-1456052483.us-east-1.elb.amazonaws.com",
];
app.use(
	cors({
		origin: function (origin, callback) {
			if (allowedOrigins.indexOf(origin) === -1) {
				let msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
	})
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", healthRouter);
app.use("/contacts", contactsRouter);
app.use("/organizations", organizationsRouter);
app.use("/locations", locationsRouter);
app.use("/communications", communicationsRouter);

app.use(errorHandler);

module.exports = app;
