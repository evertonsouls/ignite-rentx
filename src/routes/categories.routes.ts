import { Router } from "express";
import multer from "multer";
import path from "path";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: path.resolve(".", "tmp"),
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };