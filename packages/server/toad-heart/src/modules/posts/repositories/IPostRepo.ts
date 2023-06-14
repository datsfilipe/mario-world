import { Post } from "../domain/Post";

export interface IPostRepo {
  findAll(): Promise<(Post | undefined)[]>;
  findById(id: string): Promise<Post | undefined>;
  findByTitle(title: string): Promise<(Post | undefined)[]>;
  findByAuthor(authorId: string): Promise<(Post | undefined)[]>;
  save(post: Post): Promise<void>;
}
