import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter = Router();

// TODO: Simplify user routes. Use authorize for obtaining user info

// GET    /users/me
// PATCH  /users/me
// PATCH  /users/me/password
// DELETE /users/me

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

// userRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));
// PROBABLY WILL ADD AS AN ADMIN FUNCTIONALITY

userRouter.patch("/:id", authorize, updateUser);

// TODO: Add an option to change the user's password

userRouter.patch("/:id/update-password", (req, res) => res.send("bomba"));

userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
