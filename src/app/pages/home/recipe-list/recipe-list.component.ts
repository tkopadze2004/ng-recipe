import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeCardComponent } from '../../../shared/recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';
import {
  Observable,
  BehaviorSubject,
  combineLatest,
  map,
  startWith,
} from 'rxjs';
import { IRecipe } from '../../../core/interfaces/recipe.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe, RecipeCardComponent, RouterLink, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  private readonly recipeService: RecipeService = inject(RecipeService);
  public searchItem: string = '';
  public recipes$: Observable<IRecipe[]> = this.recipeService.getRecipes();
  private searchQuery$ = new BehaviorSubject<string>('');

  public filteredRecipes$: Observable<IRecipe[]> = combineLatest([
    this.recipes$,
    this.searchQuery$.pipe(startWith('')),
  ]).pipe(
    map(([recipes, query]) =>
      recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(query.toLowerCase())
          )
      )
    )
  );

  public onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(searchTerm);
  }
}
