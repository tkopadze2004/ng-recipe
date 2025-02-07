import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

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
      { path: 'page-not-found', component: PageNotFoundComponent },

      { path: '**', redirectTo: '/page-not-found' },
    ],
  },
];
