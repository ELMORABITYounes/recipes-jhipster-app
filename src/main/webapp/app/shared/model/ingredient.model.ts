import { IRecipe } from 'app/shared/model/recipe.model';

export interface IIngredient {
  id?: number;
  quantity?: number;
  unit?: string;
  name?: string;
  recipe?: IRecipe;
}

export const defaultValue: Readonly<IIngredient> = {};
