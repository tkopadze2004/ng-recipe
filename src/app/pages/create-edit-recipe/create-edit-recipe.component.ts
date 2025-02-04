import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-edit-recipe',
  standalone: true,
  imports: [],
  templateUrl: './create-edit-recipe.component.html',
  styleUrl: './create-edit-recipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditRecipeComponent {}
