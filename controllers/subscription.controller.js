import Subscription from "../models/subscription.model.js";
import AppError from "../utils/AppError.js";

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true, runValidators: true },
    );

    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// export const getUserSubscriptions = async (req, res, next) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       const error = new Error("Unauthorized");
//       error.status = 401;
//       throw error;
//     }

//     const subscriptions = await Subscription.find({ user: req.params.id });

//     res.status(200).json({ success: true, data: subscriptions });
//   } catch (error) {
//     next(error);
//   }
// };

export const getCurrentUserSubscriptions = async (req, res, next) => {
  try {
    const subscription = await Subscription.find({ user: req.user._id });

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { status: "cancelled" },
      { new: true, runValidators: true },
    );

    if (!subscription) {
      throw new AppError("Subscription not found", 404);
    }

    res.status(200).json({ status: "success", data: subscription });
  } catch (error) {
    next(error);
  }
};
