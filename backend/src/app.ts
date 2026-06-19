import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { rateLimiter } from "./middlewares/rateLimiter";
import authRouter from "./routes/authRoutes";
import venueRouter from "./routes/venueRoutes";
import bookingRouter from "./routes/bookingRoutes";
import wishlistRouter from "./routes/wishlistRoutes";
import paymentRouter from "./routes/paymentRoutes";
import notificationRouter from "./routes/notificationRoutes";

const app: Express = express();

// Global Middlewares

// 1. Helmet helps secure Express apps by setting various HTTP response headers.
app.use(helmet());

// 2. CORS configuration to safely communicate with our completed frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// 3. Rate limiting protection mechanisms to shield against API abuse
// Apply standard API rate limits globally (e.g. 200 reqs per 15 mins)
const globalRateLimit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Standard request limits reached on this IP address segment. Please pause and reattempt soon."
});

// Tighten rate limiting for registration/login authentication endpoints (e.g. 15 attempts per 15 mins)
const authRateLimit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many authentication actions from this client IP. Please try again after 15 minutes."
});

app.use("/api", globalRateLimit);
app.use("/api/v1/auth", authRateLimit);

// 4. Logger middleware to print API requests nicely to console/terminal
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// 5. Built-in body parsers to convert payload streams into usable Javascript objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base / Health-Check Endpoint with diagnostic info for monitoring dashboards
app.get("/", (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    status: "success",
    message: "BookMyVenue Production-Ready REST API is running beautifully",
    uptimeSeconds: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
});

// API Routes Mounting Point
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/venues", venueRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/notifications", notificationRouter);

// Global Centralized Error Handling Middleware (Production-Grade)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "An unexpected error occurred in our server sanctuary.";

  // A. Catch MongoDB Cast errors (Malformation parameters on ID params)
  if (err.name === "CastError") {
    statusCode = 400;
    status = "fail";
    message = `Database Cast Schema mismatch: Path mapping parameter for '${err.path}' holds an invalid format structure ('${err.value}').`;
  }

  // B. Catch Duplicate unique keys indexing write errors (e.g. occupied email indices)
  if (err.code === 11000) {
    statusCode = 400;
    status = "fail";
    const fieldsMatched = Object.keys(err.keyValue).join(", ");
    message = `Duplicate resource property conflict. Field key [${fieldsMatched}] already houses an active record in our DB registers.`;
  }

  // C. Catch Mongoose property fields constraint validation failures
  if (err.name === "ValidationError") {
    statusCode = 400;
    status = "fail";
    const mappedMessages = Object.values(err.errors).map((el: any) => el.message);
    message = `Resource model validation guard fails: ${mappedMessages.join(" ")}`;
  }

  // D. Catch Corrupt or Expired JSON Web Token exceptions
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    status = "fail";
    message = "Your active authorization session signature is corrupt. Please reauthenticate.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    status = "fail";
    message = "Your access token session credentials have run out of time. Please sign in again.";
  }

  res.status(statusCode).json({
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
