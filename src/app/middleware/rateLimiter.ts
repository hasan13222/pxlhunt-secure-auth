import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    status: 429,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});
