import { Router } from "express";
import {
    getBookmarks,
    saveDestination,
    saveDish,
    saveRestaurant,
    removeBookmark,
} from "../controllers/bookmark.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All bookmark routes are protected
router.use(verifyJWT);

router.route("/").get(getBookmarks);
router.route("/save-destination").post(saveDestination);
router.route("/save-dish").post(saveDish);
router.route("/save-restaurant").post(saveRestaurant);
router.route("/:id").delete(removeBookmark);

export default router;
