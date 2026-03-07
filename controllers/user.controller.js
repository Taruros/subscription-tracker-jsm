import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     next(error);
//   }
// };

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// export const updateUser = async (req, res, next) => {
//   const filterAllowedFields = (obj, ...allowedFields) => {
//     const filtered = {};
//     Object.keys(obj).forEach((key) => {
//       if (allowedFields.includes(key)) {
//         filtered[key] = obj[key];
//       }
//     });
//     return filtered;
//   };

//   try {
//     if (req.user.id !== req.params.id) {
//       const error = new Error("Unauthorized");
//       error.statusCode = 403;
//       throw error;
//     }

//     if (req.body.password) {
//       const error = new Error("Use /update-password to change the password");
//       error.statusCode = 400;
//       throw error;
//     }

//     const filteredUpdate = filterAllowedFields(req.body, "name", "email");

//     const user = await User.findByIdAndUpdate(req.params.id, filteredUpdate, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateCurrentUser = async (req, res, next) => {
  const filterAllowedFields = (obj, ...allowedFields) => {
    const filtered = {};
    Object.keys(obj).forEach((key) => {
      if (allowedFields.includes(key)) {
        filtered[key] = obj[key];
      }
    });
    return filtered;
  };

  try {
    if (req.body.password) {
      throw new AppError("Use /update-password to change the password", 400);
    }

    const filteredUpdate = filterAllowedFields(req.body, "name", "email");

    const user = await User.findByIdAndUpdate(req.user._id, filteredUpdate, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateCurrentPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new AppError("Incorrect password", 401);
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// export const deleteUser = async (req, res, next) => {
//   try {
//     if (req.user.id !== req.params.id) {
//       const error = new Error("Unauthorized");
//       error.statusCode = 403;
//       throw error;
//     }

//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       const error = new Error("User not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
