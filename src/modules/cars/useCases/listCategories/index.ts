import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export default (): ListCategoriesController => {
  const categoryRepository = new CategoryRepository();

  const listCategoriesUseCase = new ListCategoryUseCase(categoryRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return listCategoriesController;
};
