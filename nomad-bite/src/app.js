import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";

import destinationRouter from "./routes/destination.routes.js";
import dishRouter from "./routes/dish.routes.js";
import restaurantRouter from "./routes/restaurant.routes.js";
import articleRouter from "./routes/article.routes.js";
import reviewRouter from "./routes/review.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";

const app = express();

// ─── Global middleware ────────────────────────────────────────────────────────
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(
    cors({
        origin: corsOrigin,
        credentials: true,
    }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/api/v1/users", authRouter);

// platform routes
app.use("/api/v1/destinations", destinationRouter);
app.use("/api/v1/dishes", dishRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookmarks", bookmarkRouter);

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
    });
});

export default app;
