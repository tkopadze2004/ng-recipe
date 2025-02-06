import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { IRecipe } from '../../../core/interfaces/recipe.interface';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink, MatButtonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnDestroy {
  private readonly recipeService = inject(RecipeService);
  private readonly activatedroute = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private readonly sub$ = new Subject();

  public recipe$: Observable<IRecipe> = this.activatedroute.params.pipe(
    switchMap((params) => this.recipeService.getRecipeById(params['id']))
  );

  delete(id: any) {
    this.recipeService
      .deleteRecipe(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.openSnackBar('Recipe deleted successfully!');

        this.router.navigate(['/']);
      });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: 'popup',
    });
  }
  public ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
