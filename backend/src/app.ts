import cors from "cors";
import express from "express";
import vacationsControllers from "./6-controllers/vacations-controllers"
import authController from "./6-controllers/auth-controllers"
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appconfig from "./2-utills/appconfig";
import followerController from "./6-controllers/followers-controller";
const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", authController);
server.use("/api", vacationsControllers);
server.use("/api",followerController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appconfig.port, () => console.log(`Listening on http://localhost:${appconfig.port}`));