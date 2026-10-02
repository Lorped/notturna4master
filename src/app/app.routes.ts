import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.page').then((module) => module.LoginPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((module) => module.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((module) => module.HomePage),
  },
  {
    path: 'dadi',
    loadComponent: () =>
      import('./dadi/dadi.page').then((module) => module.DadiPage),
  },
  {
    path: 'personaggio/:id',
    loadComponent: () =>
      import('./personaggio/personaggio.page').then(
        (module) => module.PersonaggioPage
      ),
  },
  {
    path: 'sendmessaggio/:id',
    loadComponent: () =>
      import('./sendmessaggio/sendmessaggio.page').then(
        (module) => module.SendmessaggioPage
      ),
  },
  {
    path: 'sendmsgclan/:id',
    loadComponent: () =>
      import('./sendmsgclan/sendmsgclan.page').then(
        (module) => module.SendmsgclanPage
      ),
  },
];
