import { IIngredient } from 'app/shared/model/ingredient.model';
import { IAuthor } from 'app/shared/model/author.model';

export interface IRecipe {
  id?: number;
  title?: string;
  image?: string;
  description?: string;
  ingredients?: IIngredient[];
  author?: IAuthor;
}

export const defaultValue: Readonly<IRecipe> = {};
