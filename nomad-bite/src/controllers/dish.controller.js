import Dish from "../models/Dish.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// GET /api/v1/dishes
const getAllDishes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, category } = req.query;

    const filter = {};
    if (category) filter.category = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [dishes, total] = await Promise.all([
        Dish.find(filter)
            .populate("city", "name country slug")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Dish.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                dishes,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Dishes fetched successfully",
        ),
    );
});

// GET /api/v1/dishes/:id
const getDishById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const dish = await Dish.findById(id).populate("city", "name country slug");

    if (!dish) {
        throw new ApiError(404, "Dish not found");
    }

    return res.status(200).json(new ApiResponse(200, dish, "Dish fetched successfully"));
});

// GET /api/v1/dishes/city/:cityId
const getDishesByCity = asyncHandler(async (req, res) => {
    const { cityId } = req.params;
    const { page = 1, limit = 10, category } = req.query;

    const filter = { city: cityId };
    if (category) filter.category = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [dishes, total] = await Promise.all([
        Dish.find(filter)
            .populate("city", "name country slug")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Dish.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                dishes,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Dishes for city fetched successfully",
        ),
    );
});

// POST /api/v1/dishes
const createDish = asyncHandler(async (req, res) => {
    const { name, city, description, category, image, ingredients, originStory } = req.body;

    if (!name || !city || !description || !category) {
        throw new ApiError(400, "Name, city, description, and category are required");
    }

    const dish = await Dish.create({
        name,
        city,
        description,
        category,
        image,
        ingredients,
        originStory,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, dish, "Dish created successfully"));
});

// PATCH /api/v1/dishes/:id
const updateDish = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const dish = await Dish.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true },
    );

    if (!dish) {
        throw new ApiError(404, "Dish not found");
    }

    return res.status(200).json(new ApiResponse(200, dish, "Dish updated successfully"));
});

// DELETE /api/v1/dishes/:id
const deleteDish = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const dish = await Dish.findByIdAndDelete(id);

    if (!dish) {
        throw new ApiError(404, "Dish not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Dish deleted successfully"));
});

export {
    getAllDishes,
    getDishById,
    getDishesByCity,
    createDish,
    updateDish,
    deleteDish,
};
