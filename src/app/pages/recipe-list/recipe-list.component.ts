import { Component, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
servide=inject(RecipeService)

ragac=this.servide.getRecipes()
}
