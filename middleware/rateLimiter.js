import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1000 * 15,
  limit: 10,
  message: {
    status: "error",
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 1000 * 60 * 1,
  limit: 5,
  message: {
    status: "error",
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
