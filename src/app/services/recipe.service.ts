import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../core/interfaces/recipe.interface';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends ApiService {
  getRecipes(): Observable<IRecipe[]> {
    return this.get<IRecipe[]>(`recipes`);
  }

  getRecipeById(id: number): Observable<IRecipe> {
    return this.get<IRecipe>(`recipes/${id}`);
  }

  addRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.post<IRecipe>(`recipes`, recipe);
  }

  updateRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.put<IRecipe>(`recipes/${recipe.id}`, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.delete<void>(`recipes/${id}`);
  }
}
