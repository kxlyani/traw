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
    // #region agent log
    fetch('http://127.0.0.1:7271/ingest/9233227c-b5d8-4a1d-84f7-08fd85596e5a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'59e32c'},body:JSON.stringify({sessionId:'59e32c',runId:'pre-fix',hypothesisId:'E',location:'src/app.js:globalErrorHandler',message:'Global error handler',data:{method:req.method,path:req.originalUrl,statusCode:err?.statusCode||500,errName:err?.name||null,errCode:err?.code||null,message:err?.message||null,stackTop:String(err?.stack||'').split('\\n').slice(0,3).join(' | '),mongoCode:err?.errorResponse?.code||null,mongoKeyPattern:err?.errorResponse?.keyPattern||null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
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
