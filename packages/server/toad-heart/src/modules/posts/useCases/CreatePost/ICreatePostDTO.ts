export interface ICreatePostRequestDTO {
  title: string;
  content?: string;
  authorId: string;
  published?: boolean;
}
