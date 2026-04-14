import { Router } from "express";
import {
    getAllDestinations,
    getDestinationBySlug,
    createDestination,
    updateDestination,
    deleteDestination,
} from "../controllers/destination.controller.js";

const router = Router();

router.route("/").get(getAllDestinations).post(createDestination);
router.route("/:slug").get(getDestinationBySlug);
router.route("/:id").patch(updateDestination).delete(deleteDestination);

export default router;
