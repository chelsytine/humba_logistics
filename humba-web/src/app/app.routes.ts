import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home), title: 'Humba Logistics' },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About), title: 'About - Humba Logistics' },
  { path: 'services', loadComponent: () => import('./pages/services/services').then(m => m.Services), title: 'Services - Humba Logistics' },
  { path: 'fleet', loadComponent: () => import('./pages/fleet/fleet').then(m => m.Fleet), title: 'Our Fleet - Humba Logistics' },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact), title: 'Contact - Humba Logistics' },
  { path: 'messages', redirectTo: 'admin' },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin), title: 'Admin - Humba Logistics' },
  { path: '**', redirectTo: '' }
];
