import { Routes } from '@angular/router';
import { Home } from './site/home';

export const routes: Routes = [
  { path: '', component: Home, data: { lang: 'tr' } },
  { path: 'en', component: Home, data: { lang: 'en' } },
  { path: '**', redirectTo: '' },
];
