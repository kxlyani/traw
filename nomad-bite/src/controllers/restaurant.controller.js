import Restaurant from "../models/Restaurant.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// GET /api/v1/restaurants
const getAllRestaurants = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, type } = req.query;

    const filter = {};
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [restaurants, total] = await Promise.all([
        Restaurant.find(filter)
            .populate("city", "name country slug")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Restaurant.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                restaurants,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Restaurants fetched successfully",
        ),
    );
});

// GET /api/v1/restaurants/city/:cityId
const getRestaurantsByCity = asyncHandler(async (req, res) => {
    const { cityId } = req.params;
    const { page = 1, limit = 10, type } = req.query;

    const filter = { city: cityId };
    if (type) filter.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [restaurants, total] = await Promise.all([
        Restaurant.find(filter)
            .populate("city", "name country slug")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Restaurant.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                restaurants,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Restaurants for city fetched successfully",
        ),
    );
});

// POST /api/v1/restaurants
const createRestaurant = asyncHandler(async (req, res) => {
    const { name, city, type, description, address, locationCoordinates, image } = req.body;

    if (!name || !city || !type || !description) {
        throw new ApiError(400, "Name, city, type, and description are required");
    }

    const restaurant = await Restaurant.create({
        name,
        city,
        type,
        description,
        address,
        locationCoordinates,
        image,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, restaurant, "Restaurant created successfully"));
});

// PATCH /api/v1/restaurants/:id
const updateRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true },
    );

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, restaurant, "Restaurant updated successfully"));
});

// DELETE /api/v1/restaurants/:id
const deleteRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Restaurant deleted successfully"));
});

export {
    getAllRestaurants,
    getRestaurantsByCity,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};
