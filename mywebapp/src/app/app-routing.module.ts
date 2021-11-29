import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SecureRoute } from './guards/secureRoute.guard';

import { InicioComponent } from './inicio/inicio.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { LoginComponent } from './seguridad/login/login.component';
import { BooksComponent } from './books/books.component';
import { AutorComponent } from './autor/autor.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [SecureRoute] },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent, canActivate: [SecureRoute] },
  { path: 'autores', component: AutorComponent, canActivate: [SecureRoute] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecureRoute]
})
export class AppRoutingModule { }
