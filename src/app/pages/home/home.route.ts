import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateEditRecipeComponent } from './create-edit-recipe/create-edit-recipe.component';
import { HomeComponent } from './home.component';

export const recipeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'add-recipe', component: CreateEditRecipeComponent },
  { path: 'edit-recipe/:id', component: CreateEditRecipeComponent },
];
