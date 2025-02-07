import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  // Main route with LayoutComponent wrapping child routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Child route for the home page, lazy-loaded from home.route
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.route').then((m) => m.recipeRoutes),
      },

      // Route for handling page not found errors
      { path: 'page-not-found', component: PageNotFoundComponent },

      // Redirects to 'page-not-found' for unmatched paths
      { path: '**', redirectTo: '/page-not-found' },
    ],
  },
];
