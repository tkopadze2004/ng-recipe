import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  // Input properties for image, title, description, and id

  public recipeImg = input<string>('');
  public description = input<string>();
  public title = input<string>('');
  public id = input<string>('');

  // Output event to emit the recipe id when clicked
  public recipeClicked = output<string>();

  // Handle card click and emit the id
  public onCardClick(): void {
    this.recipeClicked.emit(this.id());
  }
}
