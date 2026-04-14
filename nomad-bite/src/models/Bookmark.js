import mongoose from "mongoose";

const { Schema } = mongoose;

const bookmarkSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
            unique: true,
        },
        destinationIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Destination",
            },
        ],
        dishIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Dish",
            },
        ],
        restaurantIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "Restaurant",
            },
        ],
    },
    { timestamps: true },
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
