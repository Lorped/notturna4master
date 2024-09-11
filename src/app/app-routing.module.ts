import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dadi',
    loadChildren: () => import('./dadi/dadi.module').then( m => m.DadiPageModule)
  },
  {
    path: 'personaggio/:id',
    loadChildren: () => import('./personaggio/personaggio.module').then( m => m.PersonaggioPageModule)
  },
  {
    path: 'sendmessaggio/:id',
    loadChildren: () => import('./sendmessaggio/sendmessaggio.module').then( m => m.SendmessaggioPageModule)
  },
  {
    path: 'modifica/:id',
    loadChildren: () => import('./modifica/modifica.module').then( m => m.ModificaPageModule)
  },
  {
    path: 'modifica/:id/:con',
    loadChildren: () => import('./editcond/editcond.module').then( m => m.EditcondPageModule)
  },
  {
    path: 'listaoggetti',
    loadChildren: () => import('./listaoggetti/listaoggetti.module').then( m => m.ListaoggettiPageModule)
  },
  {
    path: 'diablerie',
    loadChildren: () => import('./diablerie/diablerie.module').then( m => m.DiableriePageModule)
  },
  {
    path: 'sendmsgclan/:id',
    loadChildren: () => import('./sendmsgclan/sendmsgclan.module').then( m => m.SendmsgclanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
