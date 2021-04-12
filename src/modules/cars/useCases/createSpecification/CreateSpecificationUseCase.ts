import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationRepository.findByName(
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
