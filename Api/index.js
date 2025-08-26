import getInstagramSystem from "@unq-ui/instagram-model-js";
import express from "express";
import createPostsRouter from "./routes/postsRouter.js";
import TokenController from "./controllers/TokenController.js";
import PostsController from "./controllers/postsController.js";
const system = getInstagramSystem();
const tokenController = new TokenController(system);
const postsController = new PostsController(system, tokenController);

console.log(system.getPost("post_1"));

const app = express();
const port = 7070;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/posts", createPostsRouter(postsController, tokenController));

app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});
