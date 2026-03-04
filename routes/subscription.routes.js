import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionDetails,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subscription" }),
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" }),
);

export default subscriptionRouter;
