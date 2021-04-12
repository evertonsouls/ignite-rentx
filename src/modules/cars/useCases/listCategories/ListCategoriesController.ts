import { Response, Request } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryUseCase.execute();

    return response.json(categories);
  }
}
