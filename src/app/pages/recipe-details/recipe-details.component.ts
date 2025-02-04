import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IRecipe } from '../../core/interfaces/recipe.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly activatedroute = inject(ActivatedRoute);

  public recipe$: Observable<IRecipe> = this.activatedroute.params.pipe(
    switchMap((params) => this.recipeService.getRecipeById(params['id']))
  );
}
