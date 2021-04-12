import csvParse from "csv-parse";
import fs from "fs";
import { injectable, inject } from "tsyringe";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", () => {
          reject();
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoryRepository.findByName(name);

      if (!existCategory) {
        await this.categoryRepository.create({ name, description });
      }
    });
  }
}
