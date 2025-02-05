import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { IRecipe } from '../../../core/interfaces/recipe.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { ImageUploadService } from '../../../services/image.service';
@Component({
  selector: 'app-create-edit-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    AsyncPipe,
  ],
  templateUrl: './create-edit-recipe.component.html',
  styleUrl: './create-edit-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditRecipeComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly imageUploadService = inject(ImageUploadService);
  private recipeService: RecipeService = inject(RecipeService);
  public form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    ingredients: new FormArray([new FormControl('', Validators.required)]),
    image: new FormControl('', Validators.required),
  });

  public get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  public addIngredient(): void {
    this.ingredients.push(new FormControl('', Validators.required));
  }
  public removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
  public imageUrl$: Observable<string | null> = new Observable<string | null>();

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.imageUploadService
      .uploadImage(file)
      .pipe(
        tap((data) => {
          const imageUrl = data?.data?.image?.url || data?.data?.url;

          if (imageUrl) {
            this.form.patchValue({ image: imageUrl });
          }
        }),
        catchError((error) => {
          console.error('Upload error:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  public recipe$: Observable<IRecipe> = this.activatedRoute.params.pipe(
    map((params) => params['id']),
    switchMap((id) => {
      if (id) {
        return this.recipeService.getRecipeById(id).pipe(
          tap((recipe: IRecipe) => {
            this.form.patchValue(recipe);
          })
        );
      }
      return of();
    })
  );

  public submitForm(): void {
    this.form.markAllAsTouched();
    console.log('Image URL before submit:', this.form.value.image); // Debugging step ✅

    const { id, title, description, image, ingredients, instructions } =
      this.form.value;

    if (id) {
      this.recipeService
        .updateRecipe({
          id,
          title,
          description,
          image,
          ingredients,
          instructions,
        } as IRecipe)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      const randomid = Math.round(Math.random() * 100000);

      this.recipeService
        .addRecipe({
          id: String(randomid),
          title,
          description,
          image,
          ingredients,
          instructions,
        } as IRecipe)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
