import Destination from "../models/Destination.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// GET /api/v1/destinations
const getAllDestinations = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, tag, country } = req.query;

    const filter = {};
    if (tag) filter.tags = { $in: [tag] };
    if (country) filter.country = new RegExp(country, "i");

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [destinations, total] = await Promise.all([
        Destination.find(filter)
            .populate("signatureDishes", "name category image")
            .populate("popularRestaurants", "name type image")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }),
        Destination.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                destinations,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Destinations fetched successfully",
        ),
    );
});

// GET /api/v1/destinations/:slug
const getDestinationBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const destination = await Destination.findOne({ slug })
        .populate("signatureDishes")
        .populate("popularRestaurants");

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, destination, "Destination fetched successfully"));
});

// POST /api/v1/destinations
const createDestination = asyncHandler(async (req, res) => {
    const {
        name,
        country,
        description,
        heroImage,
        galleryImages,
        signatureDishes,
        foodMarkets,
        popularRestaurants,
        slug,
        tags,
    } = req.body;

    if (!name || !country || !description || !slug) {
        throw new ApiError(400, "Name, country, description, and slug are required");
    }

    const existing = await Destination.findOne({ slug });
    if (existing) {
        throw new ApiError(409, "A destination with this slug already exists");
    }

    const destination = await Destination.create({
        name,
        country,
        description,
        heroImage,
        galleryImages,
        signatureDishes,
        foodMarkets,
        popularRestaurants,
        slug,
        tags,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, destination, "Destination created successfully"));
});

// PATCH /api/v1/destinations/:id
const updateDestination = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const destination = await Destination.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true },
    );

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, destination, "Destination updated successfully"));
});

// DELETE /api/v1/destinations/:id
const deleteDestination = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const destination = await Destination.findByIdAndDelete(id);

    if (!destination) {
        throw new ApiError(404, "Destination not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Destination deleted successfully"));
});

export {
    getAllDestinations,
    getDestinationBySlug,
    createDestination,
    updateDestination,
    deleteDestination,
};
