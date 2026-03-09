import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getCurrentUserSubscriptions,
  // getUserSubscriptions,
  getSubscriptionDetails,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.get("/me", authorize, getCurrentUserSubscriptions);

// TODO somewhere in the future :)
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" }),
);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.patch("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.patch("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

export default subscriptionRouter;
