import { UniqueEntityID } from "@server/shared/src/core/domain/UniqueEntityID";
import { IDomainEvent } from "@server/shared/src/core/domain/events/IDomainEvent";

import { Post } from "../Post";

export class PostCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public post: Post;

  constructor(post: Post) {
    this.dateTimeOccurred = new Date();
    this.post = post;
  }

  getAggregateId(): UniqueEntityID {
    return this.post.id;
  }
}
