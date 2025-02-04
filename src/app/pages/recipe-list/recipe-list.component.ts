import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AsyncPipe } from '@angular/common';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe, RecipeCardComponent, RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  servide = inject(RecipeService);

  ragac = this.servide.getRecipes();
}
