import { Router } from "express";

import userRouter from "@modules/users/infra/http";
// import { postsRouter } from "@modules/posts/infra/http";

const router = Router();

router.use("/user", userRouter);
// router.use("/posts", postsRouter);

export { router };
