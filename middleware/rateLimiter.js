import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1000 * 15,
  max: 10,
  message: {
    status: "error",
    message: "Too many requests. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
