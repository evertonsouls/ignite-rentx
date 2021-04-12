import { Specification } from "../../entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[] = [];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ISpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}
