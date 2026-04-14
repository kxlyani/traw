import mongoose from "mongoose";

const { Schema } = mongoose;

const dishSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Dish name is required"],
            trim: true,
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            required: [true, "City (destination) reference is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        category: {
            type: String,
            enum: ["street food", "dessert", "traditional", "beverage", "snack", "main course"],
            required: [true, "Category is required"],
        },
        image: {
            type: String,
            default: "",
        },
        ingredients: [
            {
                type: String,
                trim: true,
            },
        ],
        originStory: {
            type: String,
            default: "",
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    { timestamps: true },
);

const Dish = mongoose.model("Dish", dishSchema);

export default Dish;
