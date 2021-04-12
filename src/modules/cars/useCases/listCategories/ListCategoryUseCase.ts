import { injectable, inject } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
export class ListCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
