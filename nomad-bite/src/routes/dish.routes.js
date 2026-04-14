import { Router } from "express";
import {
    getAllDishes,
    getDishById,
    getDishesByCity,
    createDish,
    updateDish,
    deleteDish,
} from "../controllers/dish.controller.js";

const router = Router();

router.route("/").get(getAllDishes).post(createDish);
router.route("/city/:cityId").get(getDishesByCity);
router.route("/:id").get(getDishById).patch(updateDish).delete(deleteDish);

export default router;
