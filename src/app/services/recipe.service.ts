import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../core/interfaces/recipe.interface';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends ApiService {
  // Fetches a list of recipes
  getRecipes(): Observable<IRecipe[]> {
    return this.get<IRecipe[]>(`recipes`);
  }

  // Fetches a specific recipe by ID
  getRecipeById(id: number): Observable<IRecipe> {
    return this.get<IRecipe>(`recipes/${id}`);
  }

  // Adds a new recipe
  addRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.post<IRecipe>(`recipes`, recipe);
  }

  // Updates an existing recipe
  updateRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.put<IRecipe>(`recipes/${recipe.id}`, recipe);
  }

  // Deletes a recipe by its ID
  deleteRecipe(id: string): Observable<void> {
    return this.delete<void>(`recipes/${id}`);
  }
}
