import { prisma } from "@infra/prisma/client";
import { Post } from "@modules/posts/domain/Post";
import { PostMap } from "@modules/posts/mappers/PostMap";
import { IPostRepo } from "@modules/posts/repositories/IPostRepo";
import { DomainEvents } from "@server/shared/src/core/domain/events/DomainEvents";

export class PrismaPostRepo implements IPostRepo {
  async findAll(): Promise<(Post | undefined)[]> {
    const rawPosts = await prisma.post.findMany();

    if (!rawPosts) {
      return [];
    }

    return rawPosts.map((rawPost) => PostMap.toDomain(rawPost));
  }

  async findById(id: string): Promise<Post | undefined> {
    const rawPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!rawPost) {
      return;
    }

    return PostMap.toDomain(rawPost);
  }

  async findByTitle(title: string): Promise<(Post | undefined)[]> {
    const rawPosts = await prisma.post.findMany({
      where: { title },
    });

    if (!rawPosts) {
      return [];
    }

    return rawPosts.map((rawPost) => PostMap.toDomain(rawPost));
  }

  async findByAuthor(authorId: string): Promise<(Post | undefined)[]> {
    const rawPosts = await prisma.post.findMany({
      where: { authorId },
    });

    if (!rawPosts) {
      return [];
    }

    return rawPosts.map((rawPost) => PostMap.toDomain(rawPost));
  }

  async save(post: Post): Promise<void> {
    const data = await PostMap.toPersistence(post);

    await prisma.post.upsert({
      where: { id: post.id.toString() },
      update: data,
      create: data,
    });

    DomainEvents.dispatchEventsForAggregate(post.id);
  }
}
