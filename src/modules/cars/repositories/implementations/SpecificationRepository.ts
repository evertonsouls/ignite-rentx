import { getRepository, Repository } from "typeorm";

import { Specification, Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    return this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}
