import express from "express";
import postController from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);
// what happening, when the user hit the endpoint, we going run our middleware func, middleware func is going to check if the user is logged in, if the user is logged in, then it will call next() and then it will go to the createPost controller
// if not logged in, then it will send back a 401 status code
router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

export default router;
