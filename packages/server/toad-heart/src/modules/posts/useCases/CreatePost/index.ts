import { PrismaPostRepo } from "@modules/posts/infra/prisma/PrismaPostRepo";

import { CreatePostController } from "./CreatePostController";
import { CreatePostUseCase } from "./CreatePostUseCase";

const prismaPostRepo = new PrismaPostRepo();

const createPostUseCase = new CreatePostUseCase(prismaPostRepo);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostUseCase, createPostController };
