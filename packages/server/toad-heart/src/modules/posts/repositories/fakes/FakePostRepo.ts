import { Post } from "@modules/posts/domain/Post";

import { IPostRepo } from "../IPostRepo";

export default class FakePostRepo implements IPostRepo {
  private posts: Post[] = [];

  async findAll(): Promise<(Post | undefined)[]> {
    return this.posts;
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.posts.find(post => post.id.toString() === id);
  }

  async findByTitle(title: string): Promise<(Post | undefined)[]> {
    return this.posts.filter(post => post.title === title);
  }

  async findByAuthor(authorId: string): Promise<(Post | undefined)[]> {
    return this.posts.filter(post => post.authorId === authorId);
  }

  async save(post: Post): Promise<void> {
    this.posts.push(post);
  }
}
