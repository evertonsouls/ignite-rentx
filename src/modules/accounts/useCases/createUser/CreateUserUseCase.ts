import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(request: IRequest): Promise<void> {
    await this.usersRepository.create(request);
  }
}
