import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

export class ListCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
