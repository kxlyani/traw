import { Router } from "express";
import {
    createReview,
    getReviewsByDestination,
    getReviewsByDish,
    getReviewsByRestaurant,
    deleteReview,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All review routes are protected
router.use(verifyJWT);

router.route("/").post(createReview);
router.route("/destination/:destinationId").get(getReviewsByDestination);
router.route("/dish/:dishId").get(getReviewsByDish);
router.route("/restaurant/:restaurantId").get(getReviewsByRestaurant);
router.route("/:id").delete(deleteReview);

export default router;
