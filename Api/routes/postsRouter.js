import express from "express";

const createPostsRouter = (postsController, tokenController) => {
  const postsRouter = express.Router();

  postsRouter.get(
    "/:postId",
    tokenController.checkRole("public"),
    postsController.getPost
  );

  return postsRouter;
};

export default createPostsRouter;
