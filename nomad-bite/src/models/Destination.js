import mongoose from "mongoose";

const { Schema } = mongoose;

const destinationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Destination name is required"],
            trim: true,
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        heroImage: {
            type: String,
            default: "",
        },
        galleryImages: [
            {
                type: String,
            },
        ],
        signatureDishes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Dish",
            },
        ],
        foodMarkets: [
            {
                name: { type: String },
                description: { type: String },
                location: { type: String },
            },
        ],
        popularRestaurants: [
            {
                type: Schema.Types.ObjectId,
                ref: "Restaurant",
            },
        ],
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    { timestamps: true },
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;
