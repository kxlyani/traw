import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
        },
        destinationId: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            default: null,
        },
        dishId: {
            type: Schema.Types.ObjectId,
            ref: "Dish",
            default: null,
        },
        restaurantId: {
            type: Schema.Types.ObjectId,
            ref: "Restaurant",
            default: null,
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true },
);

// Ensure at least one reference is provided
reviewSchema.pre("save", function (next) {
    if (!this.destinationId && !this.dishId && !this.restaurantId) {
        return next(new Error("Review must reference a destination, dish, or restaurant"));
    }
    next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
