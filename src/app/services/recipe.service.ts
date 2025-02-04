import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRecipe } from '../core/interfaces/recipe.interface';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService extends ApiService {


  getRecipes(): Observable<IRecipe[]> {
    return this.get<IRecipe[]>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<IRecipe> {
    return this.get<IRecipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(recipe: IRecipe): Observable<IRecipe> {
    return this.post<IRecipe>(this.apiUrl, recipe);
  }

  updateRecipe(id: number, recipe: IRecipe): Observable<IRecipe> {
    return this.put<IRecipe>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.delete<void>(`${this.apiUrl}/${id}`);
  }
}
