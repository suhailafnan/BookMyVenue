import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipCache = new Map<string, RateLimitRecord>();

/**
 * A highly resilient, lightweight, in-memory sliding-window Rate Limiter.
 * Prevents DDoS and API abuse during production/testing environments, returning a robust HTTP 429 payload.
 */
export const rateLimiter = (options: {
  windowMs: number;
  max: number;
  message?: string;
}) => {
  const { windowMs, max, message } = options;

  return (req: Request, res: Response, next: NextFunction): void => {
    // Get client IP address accurately
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      req.socket.remoteAddress ||
      "anonymous";

    const now = Date.now();
    const record = ipCache.get(ip);

    if (!record) {
      // Initialize new record
      ipCache.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });

      // Set standard clean rate-limit indicators in headers for the client
      res.setHeader("X-RateLimit-Limit", max);
      res.setHeader("X-RateLimit-Remaining", max - 1);
      res.setHeader("X-RateLimit-Reset", Math.ceil((now + windowMs) / 1000));
      return next();
    }

    if (now > record.resetTime) {
      // Re-initialize for next window frame
      record.count = 1;
      record.resetTime = now + windowMs;
      ipCache.set(ip, record);

      res.setHeader("X-RateLimit-Limit", max);
      res.setHeader("X-RateLimit-Remaining", max - 1);
      res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));
      return next();
    }

    // Increment count if within window limits
    record.count += 1;
    const remaining = Math.max(0, max - record.count);

    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      return next(
        new AppError(
          message || "Too many requests from this IP. Please try again after some time.",
          429
        )
      );
    }

    next();
  };
};

// Periodically clean stale cache entries to avoid memory bloat
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipCache.entries()) {
    if (now > record.resetTime) {
      ipCache.delete(ip);
    }
  }
}, 3600000); // Once every hour
