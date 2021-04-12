import { injectable, inject } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );
    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    return this.specificationRepository.create({
      name,
      description,
    });
  }
}
