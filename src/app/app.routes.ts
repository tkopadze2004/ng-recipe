import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { LayoutComponent } from './shared/layout/layout.component';

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
    ],
  },
];
