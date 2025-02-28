import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  catchError,
  finalize,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IRecipe } from '../../../core/interfaces/recipe.interface';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnDestroy {
  private readonly recipeService = inject(RecipeService);
  private readonly activatedroute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly sub$ = new Subject();
  public isLoading: boolean = true;

  // Fetches the recipe details based on the recipe ID from the URL parameters.
  public recipe$: Observable<IRecipe | null> = this.activatedroute.params.pipe(
    switchMap((params) => this.recipeService.getRecipeById(params['id'])),
    tap(() => {
      this.isLoading = false;
    }),
    catchError((error) => {
      this.isLoading = false;
      return of(null);
    }),
    finalize(() => {
      this.isLoading = false;
    })
  );
  /*
   * Delete  recipe by ID.
   * After deletion, displays a confirmation message and redirects to the home page.
   */
  public delete(id: string) {
    this.recipeService
      .deleteRecipe(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.openSnackBar('Recipe deleted successfully!');
        this.router.navigate(['/']);
      });
  }

  // Displays a message using Angular Material Snackbar
  private openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: 'popup',
    });
  }

  // Cleanup subscriptions
  public ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
