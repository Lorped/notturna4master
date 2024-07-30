import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { PipesModule } from './pipes/pipes.module';
import { FullOggetto, Condizione, Con } from './global';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, PipesModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FullOggetto, Condizione, Con],
  bootstrap: [AppComponent],
})
export class AppModule {}
