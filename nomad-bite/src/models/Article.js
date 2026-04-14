import mongoose from "mongoose";

const { Schema } = mongoose;

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Article title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        relatedCity: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            default: null,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        publishDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
