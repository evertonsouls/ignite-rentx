import { injectable, inject } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.list();
  }
}
