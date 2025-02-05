import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.route').then((m) => m.recipeRoutes),
      },
      { path: '**', redirectTo: '/page-not-found' },
    ],
  },
];
