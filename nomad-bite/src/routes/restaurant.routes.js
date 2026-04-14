import { Router } from "express";
import {
    getAllRestaurants,
    getRestaurantsByCity,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from "../controllers/restaurant.controller.js";

const router = Router();

router.route("/").get(getAllRestaurants).post(createRestaurant);
router.route("/city/:cityId").get(getRestaurantsByCity);
router.route("/:id").patch(updateRestaurant).delete(deleteRestaurant);

export default router;
