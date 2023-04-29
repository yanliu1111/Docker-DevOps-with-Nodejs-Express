import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPosts);

router
  .route(":/id")
  .get(postController.getOnePosts)
  .patch(postController.updatePosts)
  .delete(postController.deletePosts);

export default router;
