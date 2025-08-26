import { transformPost } from "../Dtos.js";
import { putPostBodySchema } from "../schemas.js";

class PostsController {
  constructor(system, tokenController) {
    this.system = system;
    this.tokenController = tokenController;
  }

  getPost = (req, res) => {
    try {
      const postId = req.params.postId;
      const post = this.system.getPost(postId);

      res.json(transformPost(post));
    } catch (error) {
      res.status(404).send("Post not found");
    }
  };
}

export default PostsController;
