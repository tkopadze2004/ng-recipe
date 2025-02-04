import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipe } from '../../core/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe, RecipeCardComponent, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  private readonly recipeServide: RecipeService = inject(RecipeService);

  public recipes$: Observable<IRecipe[]> = this.recipeServide.getRecipes();
}
