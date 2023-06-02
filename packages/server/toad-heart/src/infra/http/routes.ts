import { Router } from "express";

// import { userRouter } from "@modules/user/infra/http";
// import { postsRouter } from "@modules/posts/infra/http";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
// router.use("/user", userRouter);
// router.use("/posts", postsRouter);

export { router };
