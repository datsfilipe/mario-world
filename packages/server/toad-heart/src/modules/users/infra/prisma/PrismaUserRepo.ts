import { prisma } from "@infra/prisma/client";
import { User } from "@modules/users/domain/User";
import { UserEmail } from "@modules/users/domain/UserEmail";
import { IUserRepo } from "@modules/users/repositories/IUserRepo";

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
  }

  async findById(id: string): Promise<User | undefined> {
    const rawUser = await prisma.user.findFirst({
      where: { id },
    });

    if (!rawUser) {
      return;
    }
  }

  async save(user: User): Promise<void> {
    // TODO: Implement
    throw new Error("Method not implemented.");
  }
}
