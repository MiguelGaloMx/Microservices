import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './seguridad/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { BarComponent } from './navigation/bar/bar.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { BooksComponent } from './books/books.component';

import { NewBookComponent } from './books/new-book/new-book.component';
import { AutorComponent } from './autor/autor.component';
import { SecurityInterceptor } from './seguridad/seguridad.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistrarComponent,
    LoginComponent,
    BarComponent,
    MenuComponent,
    BooksComponent,
    NewBookComponent,
    AutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi:true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBookComponent]
})
export class AppModule { }
