import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client';
import { environment } from './environments/environment';
import { HttpLink } from 'apollo-angular/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        provideApollo(() => {
            return {
                link: inject(HttpLink).create({ uri: environment.graphqlUri }),
                cache: new InMemoryCache(),
                defaultOptions: {
                    watchQuery: { fetchPolicy: 'network-only' },
                    query: { fetchPolicy: 'network-only' },
                },
            };
        }),
    ]
};
