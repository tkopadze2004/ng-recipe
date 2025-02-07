import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { CreateEditRecipeComponent } from './create-edit-recipe/create-edit-recipe.component';
import { HomeComponent } from './home.component';

export const recipeRoutes: Routes = [
  // Default route leading to the HomeComponent
  {
    path: '',
    component: HomeComponent,
  },
  // Route to view details of a specific recipe, using recipe ID
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  // Route to add a new recipe
  { path: 'add-recipe', component: CreateEditRecipeComponent },
  // Route to edit an existing recipe, using recipe ID
  { path: 'edit-recipe/:id', component: CreateEditRecipeComponent },
];
