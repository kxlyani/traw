import { Router } from "express";
import {
    getAllArticles,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../controllers/article.controller.js";

const router = Router();

router.route("/").get(getAllArticles).post(createArticle);
router.route("/:slug").get(getArticleBySlug);
router.route("/:id").patch(updateArticle).delete(deleteArticle);

export default router;
