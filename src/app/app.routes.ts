import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { CreateEditRecipeComponent } from './pages/create-edit-recipe/create-edit-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'recipes/:id', component: RecipeDetailsComponent },
      { path: 'add-recipe', component: CreateEditRecipeComponent },
      { path: 'edit-recipe/:id', component: CreateEditRecipeComponent },
    ],
  },
];
