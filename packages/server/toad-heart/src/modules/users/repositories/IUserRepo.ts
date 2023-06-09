import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";

export interface IUserRepo {
  findByEmail(email: string | UserEmail): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<void>;
}
