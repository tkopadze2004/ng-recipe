import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IRecipe } from '../../../core/interfaces/recipe.interface';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatButtonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent {
  private readonly recipeService = inject(RecipeService);
  private readonly activatedroute = inject(ActivatedRoute);
  router = inject(Router);

  public recipe$: Observable<IRecipe> = this.activatedroute.params.pipe(
    switchMap((params) => this.recipeService.getRecipeById(params['id']))
  );

  delete(id: any) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
