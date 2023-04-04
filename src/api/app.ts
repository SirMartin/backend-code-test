import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import * as geniallyController from "./controllers/genially";

// I tried for almost 2 hours making a normal import and config it later, but it fails all the time, something related to typescript,
// finally I found this way that works, don't know really the difference, but eslint doesn't like, so... Sorry if this is too bad,
// node is not my world, and I am suffering a little with dependencies.
/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv").config({ path: "./.env" });

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);
app.post("/genially", geniallyController.createGenially);
app.put("/genially/:id/rename", geniallyController.renameGenially);
app.delete("/genially/:id", geniallyController.deleteGenially);


export default app;
