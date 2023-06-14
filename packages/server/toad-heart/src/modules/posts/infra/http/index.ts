import express from "express";

import { createPostController } from "@modules/posts/useCases/CreatePost";

const postRouter = express.Router();

postRouter.post("/", (request, response) =>
  createPostController.execute(request, response)
);

export default postRouter;
