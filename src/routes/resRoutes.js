import express from "express";
import {
  handleListLikeByResID,
  handleListRateByResID,
} from "../controller/resController.js";

const resRouter = express.Router();

resRouter.get("/list-like-res-by-resid/:resID", handleListLikeByResID);
resRouter.get("/list-rate-res-by-resid/:resID", handleListRateByResID);

export default resRouter;
