import { json } from "express";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const usersAlreadyExist = this.usersRepository.findByEmail(email);

    if (usersAlreadyExist) {
      throw new Error("User already exist!");
    }

    const user = this.usersRepository.create({
      email,
      name,
    });

    return user;
  }
}

export { CreateUserUseCase };
