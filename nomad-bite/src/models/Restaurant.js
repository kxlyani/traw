import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant name is required"],
            trim: true,
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: "Destination",
            required: [true, "City (destination) reference is required"],
        },
        type: {
            type: String,
            enum: ["street food", "cafe", "restaurant", "bar", "bakery", "food truck"],
            required: [true, "Restaurant type is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        address: {
            type: String,
            default: "",
        },
        locationCoordinates: {
            lat: {
                type: Number,
                default: null,
            },
            lng: {
                type: Number,
                default: null,
            },
        },
        image: {
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

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
