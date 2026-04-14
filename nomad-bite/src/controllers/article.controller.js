import Article from "../models/Article.js";
import ApiResponse from "../utils/api-response.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

// GET /api/v1/articles
const getAllArticles = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, tag, cityId } = req.query;

    const filter = {};
    if (tag) filter.tags = { $in: [tag] };
    if (cityId) filter.relatedCity = cityId;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [articles, total] = await Promise.all([
        Article.find(filter)
            .populate("relatedCity", "name country slug")
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ publishDate: -1 }),
        Article.countDocuments(filter),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                articles,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / parseInt(limit)),
                },
            },
            "Articles fetched successfully",
        ),
    );
});

// GET /api/v1/articles/:slug
const getArticleBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const article = await Article.findOne({ slug }).populate(
        "relatedCity",
        "name country slug",
    );

    if (!article) {
        throw new ApiError(404, "Article not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, article, "Article fetched successfully"));
});

// POST /api/v1/articles
const createArticle = asyncHandler(async (req, res) => {
    const { title, slug, author, coverImage, content, relatedCity, tags, publishDate } =
        req.body;

    if (!title || !slug || !author || !content) {
        throw new ApiError(400, "Title, slug, author, and content are required");
    }

    const existing = await Article.findOne({ slug });
    if (existing) {
        throw new ApiError(409, "An article with this slug already exists");
    }

    const article = await Article.create({
        title,
        slug,
        author,
        coverImage,
        content,
        relatedCity,
        tags,
        publishDate,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, article, "Article created successfully"));
});

// PATCH /api/v1/articles/:id
const updateArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const article = await Article.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true },
    );

    if (!article) {
        throw new ApiError(404, "Article not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, article, "Article updated successfully"));
});

// DELETE /api/v1/articles/:id
const deleteArticle = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
        throw new ApiError(404, "Article not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Article deleted successfully"));
});

export {
    getAllArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
};
