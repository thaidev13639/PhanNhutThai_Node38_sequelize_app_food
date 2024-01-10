import express from "express";
import {
  handldeListLikeByUser,
  handldeListRateByUser,
  handleLikeRes,
  handleOrderFood,
  handleRateRes,
} from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/list-like-res-by-user/:userID", handldeListLikeByUser);
userRoutes.get("/list-rate-res-by-user/:userID", handldeListRateByUser);
userRoutes.post("/order-food-by-user", handleOrderFood);
userRoutes.post("/rate-restaurant-by-user", handleRateRes);
userRoutes.post("/like-or-unlike-restaurant", handleLikeRes);

export default userRoutes;
