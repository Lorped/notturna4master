import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { FullOggetto, Condizione, Con } from './global';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FullOggetto,
    Condizione,
    Con,
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ],
};
