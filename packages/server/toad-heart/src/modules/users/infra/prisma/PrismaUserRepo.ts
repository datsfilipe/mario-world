import { prisma } from "@infra/prisma/client";
import { User } from "@modules/users/domain/User";
import { UserEmail } from "@modules/users/domain/UserEmail";
import { UserMap } from "@modules/users/mappers/UserMap";
import { IUserRepo } from "@modules/users/repositories/IUserRepo";
import { DomainEvents } from "@server/shared/src/core/domain/events/DomainEvents";

export class PrismaUserRepo implements IUserRepo {
  async findByEmail(email: string | UserEmail): Promise<User | undefined> {
    const rawUser = await prisma.user.findFirst({
      where: {
        email: email instanceof UserEmail ? email.value : email,
      },
    });

    if (!rawUser) {
      return;
    }

    return UserMap.toDomain(rawUser);
  }

  async findById(id: string): Promise<User | undefined> {
    const rawUser = await prisma.user.findFirst({
      where: { id },
    });

    if (!rawUser) {
      return;
    }

    return UserMap.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    const data = await UserMap.toPersistence(user);

    await prisma.user.upsert({
      where: { id: user.id.toString() },
      update: data,
      create: data,
    });

    DomainEvents.dispatchEventsForAggregate(user.id);
  }
}
