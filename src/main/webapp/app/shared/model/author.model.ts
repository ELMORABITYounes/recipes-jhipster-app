import { IRecipe } from 'app/shared/model/recipe.model';

export interface IAuthor {
  id?: number;
  name?: string;
  website?: string;
  recipes?: IRecipe[];
}

export const defaultValue: Readonly<IAuthor> = {};
