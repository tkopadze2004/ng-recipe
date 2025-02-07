import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeCardComponent } from '../../../shared/recipe-card/recipe-card.component';
import { Router } from '@angular/router';
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
  imports: [AsyncPipe, RecipeCardComponent, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  private readonly recipeService: RecipeService = inject(RecipeService);
  public searchItem: string = '';
  public recipes$: Observable<IRecipe[]> = this.recipeService.getRecipes();
  private searchQuery$ = new BehaviorSubject<string>('');
  private readonly router: Router = inject(Router);

  /*
   * Filters recipes based on the search query.
   * The search applies to both recipe titles and ingredients.
   * Results are displayed in reverse order (most recent first).
   */
  public filteredRecipes$: Observable<IRecipe[]> = combineLatest([
    this.recipes$,
    this.searchQuery$.pipe(startWith('')),
  ]).pipe(
    map(([recipes, query]) =>
      recipes
        .filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(query.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(query.toLowerCase())
            )
        )
        .reverse()
    )
  );

  // Handle search input
  public onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(searchTerm);
  }

  //navigate to the recipe details page
  public onRecipeClick(id: string): void {
    this.router.navigate(['/recipes', id]);
  }
}
