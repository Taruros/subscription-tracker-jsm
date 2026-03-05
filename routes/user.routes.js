import { Router } from "express";
import {
  getUsers,
  // getUser,
  getCurrentUser,
  // updateUser,
  updateCurrentUser,
  updateCurrentPassword,
  // deleteUser,
  deleteCurrentUser,
} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

// userRouter.get("/:id", authorize, getUser);
userRouter.get("/me", authorize, getCurrentUser);

// userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
// PROBABLY WILL ADD AS AN ADMIN FUNCTIONALITY

// userRouter.patch("/:id", authorize, updateUser);
userRouter.patch("/me", authorize, updateCurrentUser);

// TODO: Add an option to change the user's password

// userRouter.patch("/:id/update-password", (req, res) => res.send("bomba"));
userRouter.patch("/me/update-password", authorize, updateCurrentPassword);

// userRouter.delete("/:id", authorize, deleteUser);
userRouter.delete("/:id", authorize, deleteCurrentUser);

export default userRouter;
