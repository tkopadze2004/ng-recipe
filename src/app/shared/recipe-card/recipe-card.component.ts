import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  public recipeImg = input<string>('');
  public description = input<string>();
  public title = input<string>('');
}
