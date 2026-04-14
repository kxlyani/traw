import Review from "../models/Review.js";
import Dish from "../models/Dish.js";
import Restaurant from "../models/Restaurant.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// Helper to recalculate average rating for a dish or restaurant
const recalculateAverageRating = async (model, idField, id) => {
    const result = await Review.aggregate([
        { $match: { [idField]: id } },
        { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);
    const avg = result.length > 0 ? parseFloat(result[0].avg.toFixed(1)) : 0;
    await model.findByIdAndUpdate(id, { averageRating: avg });
};

// POST /api/v1/reviews  (protected)
const createReview = asyncHandler(async (req, res) => {
    const { destinationId, dishId, restaurantId, rating, comment } = req.body;

    if (!destinationId && !dishId && !restaurantId) {
        throw new ApiError(
            400,
            "Review must reference a destination, dish, or restaurant",
        );
    }

    if (!rating) {
        throw new ApiError(400, "Rating is required");
    }

    const review = await Review.create({
        userId: req.user._id,
        destinationId: destinationId || null,
        dishId: dishId || null,
        restaurantId: restaurantId || null,
        rating,
        comment,
    });

    await review.populate("userId", "username avatar");

    // Update average ratings
    if (dishId) await recalculateAverageRating(Dish, "dishId", review.dishId);
    if (restaurantId)
        await recalculateAverageRating(Restaurant, "restaurantId", review.restaurantId);

    return res
        .status(201)
        .json(new ApiResponse(201, review, "Review submitted successfully"));
});

// GET /api/v1/reviews/destination/:destinationId
const getReviewsByDestination = asyncHandler(async (req, res) => {
    const { destinationId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
        Review.find({ destinationId })
            .populate("userId", "username avatar")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Review.countDocuments({ destinationId }),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                reviews,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Reviews fetched successfully",
        ),
    );
});

// GET /api/v1/reviews/dish/:dishId
const getReviewsByDish = asyncHandler(async (req, res) => {
    const { dishId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
        Review.find({ dishId })
            .populate("userId", "username avatar")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Review.countDocuments({ dishId }),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                reviews,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Reviews fetched successfully",
        ),
    );
});

// GET /api/v1/reviews/restaurant/:restaurantId
const getReviewsByRestaurant = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
        Review.find({ restaurantId })
            .populate("userId", "username avatar")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Review.countDocuments({ restaurantId }),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                reviews,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Reviews fetched successfully",
        ),
    );
});

// DELETE /api/v1/reviews/:id  (protected — only the review owner can delete)
const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.userId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this review");
    }

    const { dishId, restaurantId } = review;
    await review.deleteOne();

    // Recalculate ratings after deletion
    if (dishId) await recalculateAverageRating(Dish, "dishId", dishId);
    if (restaurantId)
        await recalculateAverageRating(Restaurant, "restaurantId", restaurantId);

    return res.status(200).json(new ApiResponse(200, {}, "Review deleted successfully"));
});

export {
    createReview,
    getReviewsByDestination,
    getReviewsByDish,
    getReviewsByRestaurant,
    deleteReview,
};
