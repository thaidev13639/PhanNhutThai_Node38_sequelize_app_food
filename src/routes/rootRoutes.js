import express from "express";
import userRoutes from "./userRoutes.js";
import resRouter from "./resRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/restaurant", resRouter);

export default rootRoutes;
