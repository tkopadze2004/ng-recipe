import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { IRecipe } from '../../core/interfaces/recipe.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe, RecipeCardComponent, RouterLink, NgFor, NgIf, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  private readonly recipeService: RecipeService = inject(RecipeService);

  public recipes$: Observable<IRecipe[]> = this.recipeService.getRecipes();

  // Use BehaviorSubject to store search input
  private searchQuery$ = new BehaviorSubject<string>('');

  // Filtered recipes based on search input
  public filteredRecipes$: Observable<IRecipe[]> = combineLatest([
    this.recipes$,
    this.searchQuery$.pipe(startWith(''))
  ]).pipe(
    map(([recipes, query]) =>
      recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
      )
    )
  );

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(searchTerm);
  }
}
