import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    return this.categoryRepository.create({ name, description });
  }
}
