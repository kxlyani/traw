import Bookmark from "../models/Bookmark.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// GET /api/v1/bookmarks  (protected)
const getBookmarks = asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findOne({ userId: req.user._id })
        .populate("destinationIds", "name country heroImage slug")
        .populate("dishIds", "name category image city")
        .populate("restaurantIds", "name type image city");

    if (!bookmark) {
        // Return empty bookmark if user has none yet
        return res.status(200).json(
            new ApiResponse(
                200,
                { destinationIds: [], dishIds: [], restaurantIds: [] },
                "No bookmarks found",
            ),
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, bookmark, "Bookmarks fetched successfully"));
});

// POST /api/v1/bookmarks/save-destination  (protected)
const saveDestination = asyncHandler(async (req, res) => {
    const { destinationId } = req.body;

    if (!destinationId) {
        throw new ApiError(400, "destinationId is required");
    }

    const bookmark = await Bookmark.findOneAndUpdate(
        { userId: req.user._id },
        { $addToSet: { destinationIds: destinationId } },
        { new: true, upsert: true },
    );

    return res
        .status(200)
        .json(new ApiResponse(200, bookmark, "Destination saved to bookmarks"));
});

// POST /api/v1/bookmarks/save-dish  (protected)
const saveDish = asyncHandler(async (req, res) => {
    const { dishId } = req.body;

    if (!dishId) {
        throw new ApiError(400, "dishId is required");
    }

    const bookmark = await Bookmark.findOneAndUpdate(
        { userId: req.user._id },
        { $addToSet: { dishIds: dishId } },
        { new: true, upsert: true },
    );

    return res
        .status(200)
        .json(new ApiResponse(200, bookmark, "Dish saved to bookmarks"));
});

// POST /api/v1/bookmarks/save-restaurant  (protected)
const saveRestaurant = asyncHandler(async (req, res) => {
    const { restaurantId } = req.body;

    if (!restaurantId) {
        throw new ApiError(400, "restaurantId is required");
    }

    const bookmark = await Bookmark.findOneAndUpdate(
        { userId: req.user._id },
        { $addToSet: { restaurantIds: restaurantId } },
        { new: true, upsert: true },
    );

    return res
        .status(200)
        .json(new ApiResponse(200, bookmark, "Restaurant saved to bookmarks"));
});

// DELETE /api/v1/bookmarks/:id  (protected — remove a specific item from bookmarks)
// :id here is the item ID (destination / dish / restaurant).
// The type must be specified via query param: ?type=destination|dish|restaurant
const removeBookmark = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { type } = req.query;

    if (!type || !["destination", "dish", "restaurant"].includes(type)) {
        throw new ApiError(
            400,
            "Query param 'type' is required and must be destination, dish, or restaurant",
        );
    }

    const fieldMap = {
        destination: "destinationIds",
        dish: "dishIds",
        restaurant: "restaurantIds",
    };

    const bookmark = await Bookmark.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { [fieldMap[type]]: id } },
        { new: true },
    );

    if (!bookmark) {
        throw new ApiError(404, "Bookmark list not found for this user");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, bookmark, "Item removed from bookmarks"));
});

export { getBookmarks, saveDestination, saveDish, saveRestaurant, removeBookmark };
