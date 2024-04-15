import type {
    ApplicationConfig /* ɵprovideZonelessChangeDetection as provideZonelessChangeDetection */,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        // Project works zoneless, but it's a better idea waitng for version 18 upcomming zoneless official support
        // Don't forget to remove zore.js from polyfills in the angular.json file
        // provideZonelessChangeDetection()
        provideRouter(routes),
    ],
};
