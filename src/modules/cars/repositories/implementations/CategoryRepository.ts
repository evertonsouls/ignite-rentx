import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import { ICategoryRepository, ICategoryDTO } from "../ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    return this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }
}
